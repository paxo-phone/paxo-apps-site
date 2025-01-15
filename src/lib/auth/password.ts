import { prisma } from '$lib/db';
import type { User } from '@prisma/client';
import { Argon2id } from 'oslo/password';
import { Prisma } from '@prisma/client';

const argon2id = new Argon2id();

export async function authenticateFromEmailPassword(uid: string, password: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
        where: { OR: [{ email: uid }, { username: uid }] },
        include: { passwordAuthStrategy: true },
    });

    if (!user || !user.passwordAuthStrategy) {
        return null;
    }

    const isPasswordValid = await argon2id.verify(user.passwordAuthStrategy.passwordHash, password);

    if (!isPasswordValid) {
        return null;
    }

    return user;
}

export type RegistrationUserData = {
    email: string;
    username: string;
}

export async function registerFromEmailPassword(data: RegistrationUserData, password: string): Promise<User> {
    let user;

    try {
        user = await prisma.user.create({ data });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
            // Unique constraint violation
            if (e.meta && e.meta.target && e.meta.target instanceof Array && e.meta.target[0]) {
                const violatedField = e.meta.target[0] as string;

                throw new Error(`UNAVAILABLE_${violatedField.toUpperCase()}`);
            }
        } else {
            throw e;
        }
    }

    if (!user) {
        throw new Error(`Unknown error`);
    }

    // Creation of the password auth strategy
    const pas = await prisma.passwordAuthStrategy.create({
        data: {
            passwordHash: await argon2id.hash(password),
            userId: user.id
        }
    })

    if (!pas) {
        throw new Error(`Error creating auth strategy`);
    }

    return user;
}