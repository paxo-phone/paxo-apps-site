<script lang="ts">
    import AppCard from "$lib/components/AppCard.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<div class="my-6 mx-10">
    {#each data.props.sliders as slider}
        <h1 class="text-3xl font-medium">Top in {slider.category}</h1>
        <div class="flex flex-row flex-nowrap overflow-x-auto py-4 gap-2">
            {#each slider.apps as app}
                <AppCard
                    img={app.imageUrl}
                    title={app.name}
                    shortdesc={app.shortDesc}
                />
            {/each}
        </div>
    {/each}
</div>
