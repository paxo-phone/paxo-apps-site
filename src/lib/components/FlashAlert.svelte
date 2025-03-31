<script lang="ts">
    let { type, message } = $props();
</script>

<div class="status-card" data-type={type}>
    {message}
</div>

<style>
    .status-card {
        padding: 1rem;
        border-radius: 0.5rem;
        font-weight: 500;
        margin-bottom: 1rem;
    }

    .status-card[data-type="success"] {
        border: solid 1px rgba(100, 200, 0, 0.2);
        background-color: rgba(100, 200, 0, 0.1);
    }

    .status-card[data-type="error"] {
        border: solid 1px rgba(255, 0, 0, 0.2);
        background-color: rgba(255, 0, 0, 0.1);
    }

    .status-card[data-type="warning"] {
        border: solid 1px rgba(255, 128, 0, 0.2);
        background-color: rgba(255, 128, 0, 0.1);
    }
</style>
