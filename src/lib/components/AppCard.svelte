<script lang="ts">
    let { img, title, shortdesc } = $props();
</script>

<div
    class="flex flex-row items-start p-2 min-w-80 max-w-80 max-h-24 space-x-2 hover:bg-slate-200 rounded-lg"
>
    <img src={img} class="size-20" alt="The Paxo Logo" />
    <div class="">
        <h2 class="text-xl">{title}</h2>
        <h3
            class="text-md text-slate-600 text-ellipsis overflow-hidden max-h-12"
        >
            {shortdesc}
        </h3>
    </div>
</div>
