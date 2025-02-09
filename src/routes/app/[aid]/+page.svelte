<script lang="ts">
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<div class="my-4 mx-8">
    <!-- Do not render page if an error occured -->
    {#if data.error}
        <div class="alert error">{data.error.message}</div>
    {:else}
        <div class="flex flex-row justify-between items-center mb-10">
            <div class="flex flex-row items-center space-x-4 rounded-lg">
                <img
                    src={data.props.app.imageUrl}
                    class="size-32"
                    alt="{data.props.app.name} app icon"
                />
                <div class="flex flex-col my-2">
                    <div class="space-y-1">
                        <h1 class="text-4xl">{data.props.app.name}</h1>
                        <h4 class="text-md text-slate-600">
                            {data.props.app.shortDesc}
                        </h4>
                    </div>
                    <span class="text-md mt-1 space-x-1">
                        <a
                            href={data.props.app.repoUrl}
                            class="underline"
                            target="_blank">Source code</a
                        >
                        {#if data.props.app.extUrl}
                            <a
                                href={data.props.app.extUrl}
                                class="underline"
                                target="_blank">Website</a
                            >
                        {/if}
                    </span>
                </div>
            </div>
            <div class="mr-6">
                <button class="btn primary">Download</button>
            </div>
        </div>

        <h1 class="text-3xl font-medium mb-4">Releases</h1>

        <table class="releases">
            <thead>
                <tr>
                    <th class="w-full">Name</th>
                    <th>Changelog</th>
                    <th>Download</th>
                    <th>Source</th>
                </tr>
            </thead>
            <tbody>
                {#each data.props.app.releases as r}
                    <tr>
                        <td>{r.name}</td>
                        <td>
                            {#if r.changelogUrl}
                                <a
                                    href={r.changelogUrl}
                                    class="underline"
                                    target="_blank">Changelog</a
                                >
                            {/if}
                        </td>
                        <td>
                            <a
                                href={r.downloadUrl}
                                class="underline"
                                target="_blank">Download</a
                            >
                        </td>
                        <td>
                            <a
                                href={r.sourceUrl}
                                class="underline"
                                target="_blank">Source</a
                            >
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
</div>

<style>
    .releases {
        width: 100%;
    }

    .releases td,
    .releases th {
        border: 1px solid #e5e7eb;
        padding: 0.5rem 1rem;
    }

    .releases th {
        text-align: start;
    }
</style>
