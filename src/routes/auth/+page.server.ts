import { authenticateFromEmailPassword, registerFromEmailPassword } from '$lib/auth/password';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import session from '$lib/auth/session';

export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email') as string
        const password = data.get('password') as string

        // Authenticate user
        const user = await authenticateFromEmailPassword(email, password)
        if (!user) {
            return fail(403, { error: "INVALID_CREDENTIALS" })
        }

        // Login user
        await session.login(user, cookies)
    },

    register: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email') as string
        const username = data.get('username') as string
        const password = data.get('password') as string

        // Create user
        let user;
        try {
            user = await registerFromEmailPassword({ email, username }, password)
        } catch (e) {
            if (e instanceof Error) {
                return fail(400, { error: e.message })
            }
            return
        }

        // Login user
        await session.login(user, cookies)
    }
} satisfies Actions;

export const load = (async ({ cookies }) => {
    let user;
    try {
        user = await session.getLoggedUser(cookies);
    } catch {
        return { user: null };
    }
    return { user };
}) satisfies PageServerLoad;