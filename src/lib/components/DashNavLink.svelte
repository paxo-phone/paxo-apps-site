<script lang="ts">
    import { page } from "$app/state";
    let { href, force_selected = false, children } = $props();

    const selected = $derived(
        force_selected || page.route.id?.startsWith(href),
    );
</script>

<a {href}>
    <div class="flex content-stretch">
        <div class="w-1 selection-bit" data-selected={selected}></div>
        <span class="py-1 text-lg">{@render children()}</span>
    </div>
</a>

<style>
    .selection-bit {
        background-color: #f0f0f0;
        margin-right: 8px;
    }

    .selection-bit[data-selected="true"] {
        background-color: #39ba99;
    }
</style>
