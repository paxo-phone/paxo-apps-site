import { prisma } from '$lib/db';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const app = await prisma.app.findFirst({
        where: {
            id: parseInt(params.aid)
        },
        include: {
            releases: true
        }
    });

    if (!app) {
        return { error: { message: "RESOURCE_NOT_FOUND" } };
    }

    return {
        props: {
            app
        }
    };
}) satisfies PageServerLoad;