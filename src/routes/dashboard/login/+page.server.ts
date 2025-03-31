import { authenticateFromEmailPassword, registerFromEmailPassword } from '$lib/auth/password';
import { error, fail, redirect } from '@sveltejs/kit';
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
    }
} satisfies Actions;

export const load = (async ({ parent }) => {
    const layoutData = await parent();

    if (layoutData.user) {
        redirect(301, "/dashboard");
    }
}) satisfies PageServerLoad;