<script lang="ts">
    import { page } from "$app/state";

    const isFileManager = $derived(page.route.id?.startsWith("/file-manager"));
    const isDashboard = $derived(page.route.id?.startsWith("/dashboard"));
    const isMarketplace = $derived(!isFileManager && !isDashboard);
</script>

<div class="flex items-center justify-between py-5 px-10">
    <div class="flex items-center space-x-6">
        <img src="img/logo.png" class="size-16" alt="The Paxo Logo" />
        <span class="text-3xl">
            {#if isMarketplace}
                Marketplace
            {:else if isFileManager}
                File manager
            {:else if isDashboard}
                Dashboard
            {/if}
        </span>
    </div>

    <div class="space-x-8">
        {#if !isMarketplace}
            <a href="/" class="text-xl font-sans">Marketplace</a>
        {/if}
        {#if !isFileManager}
            <a href="/file-manager" class="text-xl font-sans">File manager</a>
        {/if}
        {#if !isDashboard}
            <a href="/dashboard" class="text-xl font-sans">Dashboard</a>
        {/if}
        <a href="https://docs.paxo.fr" class="text-xl font-sans">Docs</a>
        <a href="https://paxo.fr" class="text-xl font-sans">Main website</a>
    </div>
</div>
