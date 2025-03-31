<script lang="ts">
    import FlashAlert from "$lib/components/FlashAlert.svelte";

    let { form } = $props();
</script>

<h1 class="text-4xl font-medium pb-8">Register an account</h1>

{#if form?.error}
    <FlashAlert type="error" message={form.error} />
{/if}

<form method="POST" action="?/register" class="auth-form">
    <input type="email" name="email" placeholder="Email" />
    <input type="text" name="username" placeholder="Username" />
    <input type="password" name="password" placeholder="Password" />

    <input type="submit" value="Register" class="primary" />
</form>
