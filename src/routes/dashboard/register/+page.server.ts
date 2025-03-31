import { authenticateFromEmailPassword, registerFromEmailPassword } from '$lib/auth/password';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import session from '$lib/auth/session';
import { validateEmail, validatePassword, validateUsername } from '$lib/validators/credentials';

export const actions = {
    register: async ({ request, cookies }) => {
        const data = await request.formData();

        const email = data.get('email') as string
        if (!validateEmail(email)) {
            return fail(400, { error: "INVALID_EMAIL" });
        }

        const username = data.get('username') as string
        if (!validateUsername(username)) {
            return fail(400, { error: "INVALID_USERNAME" });
        }

        const password = data.get('password') as string
        if (!validatePassword(password)) {
            return fail(400, { error: "INVALID_PASSWORD" });
        }

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

export const load = (async ({ parent }) => {
    const layoutData = await parent();

    if (layoutData.user) {
        redirect(301, "/dashboard");
    }
}) satisfies PageServerLoad;