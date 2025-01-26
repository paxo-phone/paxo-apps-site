import { appCategories } from '$lib';
import { prisma } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const sliders = []

    for (let c = 0; c < appCategories.length; c++) {
        const category = appCategories[c];

        const apps = await prisma.app.findMany({
            where: { category: c },
            orderBy: { downloads: 'asc' },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                shortDesc: true,
            }
        });

        if (apps.length) {
            sliders.push({
                category,
                apps
            });
        }

    }
    return { props: { sliders } };
}) satisfies PageServerLoad;