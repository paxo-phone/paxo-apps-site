import type { PageLoad } from './$types';
import Github from '$lib/github';

export const load: PageLoad = async ({ data, fetch }) => {
    if (data.error) {
        // The server error is not supposed to reach this load function
        return data;
    }

    if (data.props.app.releases.length === 0) {
        return { error: { message: "APP_DOES_NOT_HAVE_RELEASES" } };
    }

    return data;
};
