import session from '$lib/auth/session';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
    await session.logout(cookies);
    return redirect(302, "/auth");
};