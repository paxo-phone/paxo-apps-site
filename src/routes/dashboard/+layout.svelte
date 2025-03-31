<script lang="ts">
    import type { Snippet } from "svelte";
    import DashNavLink from "$lib/components/DashNavLink.svelte";
    import type { PageData } from "./$types";

    let { data, children }: { data: PageData; children: Snippet } = $props();
</script>

<div class="flex w-full pt-10 px-16">
    <div class="dash-nav">
        {#if data.user}
            <DashNavLink href="/dashboard/myapps">My Apps</DashNavLink>
            <DashNavLink href="/dashboard/security">
                Account security
            </DashNavLink>
            <DashNavLink href="/dashboard/support">Support</DashNavLink>
            <DashNavLink href="/dashboard/logout">
                <span class="text-red-500">Log out</span>
            </DashNavLink>
        {:else}
            <DashNavLink href="/dashboard/login">Log in</DashNavLink>
            <DashNavLink href="/dashboard/register">Register</DashNavLink>
        {/if}
    </div>
    <div>
        {@render children()}
    </div>
</div>

<style>
    .dash-nav {
        width: 300px;
        padding: 0 1rem;
    }
</style>
