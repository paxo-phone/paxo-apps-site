<script lang="ts">
    import FlashAlert from "$lib/components/FlashAlert.svelte";

    let { form } = $props();
</script>

<h1 class="text-4xl font-medium pb-8">Log in</h1>

{#if form?.error}
    <FlashAlert type="error" message={form.error} />
{/if}

<form method="POST" action="?/login" class="auth-form">
    <input type="email" name="email" placeholder="Email" />

    <input type="password" name="password" placeholder="Password" />
    <input type="submit" value="Login" class="primary" />
</form>
