import session from '$lib/auth/session';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    return {
        user: await session.getLoggedUser(cookies),
    };
}) satisfies LayoutServerLoad;