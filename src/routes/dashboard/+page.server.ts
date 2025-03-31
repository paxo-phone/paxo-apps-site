import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
    const layoutData = await parent();

    if (layoutData.user) {
        redirect(301, '/dashboard/myapps');
    } else {
        redirect(301, '/dashboard/login');
    }
}) satisfies PageServerLoad;