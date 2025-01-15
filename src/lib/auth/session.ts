import type { User, Session } from "@prisma/client";
import { decodeBase32, encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { prisma } from "../db";
import type { Cookies } from "@sveltejs/kit";

type SessionValidationResult =
    | { session: Session; user: User }
    | { session: null; user: null };

const InvalidSession: SessionValidationResult = { session: null, user: null };


function generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
}

function getSessionIdFromToken(token: string): string {
    return encodeHexLowerCase(sha256(decodeBase32(token)));
}

const SESSION_DURATION = 1000 * 60 * 60 * 24 * 30; // 30 days

async function createSession(token: string, userId: number): Promise<Session> {
    const sessionId = getSessionIdFromToken(token);
    const session: Session = {
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + SESSION_DURATION),
    }

    await prisma.session.create({
        data: session,
    });

    return session;
}

async function validateSessionToken(token: string): Promise<SessionValidationResult> {
    const sessionId = getSessionIdFromToken(token);
    const result = await prisma.session.findUnique({
        where: { id: sessionId },
        include: { user: true },
    });

    if (!result) {
        return InvalidSession
    }

    const { user, ...session } = result;

    // Session is expired
    if (session.expiresAt.getTime() < Date.now()) {
        await prisma.session.delete({
            where: { id: sessionId },
        });
        return InvalidSession
    }

    // If session is valid, update the expiration time
    await prisma.session.update({
        where: { id: sessionId },
        data: { expiresAt: new Date(Date.now() + SESSION_DURATION) },
    });

    return { session, user };
}

async function invalidateSession(token: string) {
    const sessionId = getSessionIdFromToken(token);
    await prisma.session.delete({
        where: { id: sessionId },
    });
}

// This function returns the authenticated user based on the session token stored in the cookie.
// If the token is not found or the session is invalid, it throws an error.
//
// This function is meant to be used to check if the user is authenticated before accessing protected routes,
// as a triggered error will cause a redirection to the error page.

async function getLoggedUser(cookieManager: Cookies): Promise<User> {
    const token = cookieManager.get("token");

    if (!token) {
        throw new Error("User is not authenticated");
    }

    const result = await validateSessionToken(token);
    if (!result.user) {
        throw new Error("Invalid session");
    }

    return result.user;
}

async function login(user: User, cookieManager: Cookies) {
    const token = generateSessionToken();
    const session = await createSession(token, user.id);

    cookieManager.set("token", token, {
        httpOnly: true,
        expires: session.expiresAt,
        sameSite: "lax",
        path: "/"
    })
}

async function logout(cookieManager: Cookies) {
    const token = cookieManager.get("token");
    if (!token) {
        return;
    }

    await invalidateSession(token);

    cookieManager.set("token", "", {
        httpOnly: true,
        maxAge: 0,
        sameSite: "lax",
        path: "/"
    });
}

export default { login, logout, getLoggedUser };