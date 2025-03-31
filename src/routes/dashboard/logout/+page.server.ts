import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import session from '$lib/auth/session';

export const load = (async ({ cookies }) => {
    await session.logout(cookies);
    return redirect(302, "/");
}) satisfies PageServerLoad;