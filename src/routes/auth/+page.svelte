<script lang="ts">
    let { data, form } = $props();
</script>

<p class="error">{form?.error}</p>

{#if data.user == null}
    Not authenticated
    <form method="POST" action="?/login">
        <label for="email-log-inp">Email:</label>
        <input type="email" name="email" id="email-log-inp" />

        <label for="password-log-inp">Password:</label>
        <input type="password" name="password" id="password-log-inp" />
        <input type="submit" value="Login" />
    </form>

    <form method="POST" action="?/register">
        <label for="email-reg-inp">Email:</label>
        <input type="email" name="email" id="email-reg-inp" />

        <label for="username-reg-inp">Username:</label>
        <input type="text" name="username" id="username-reg-inp" />

        <label for="password-reg-inp">Password:</label>
        <input type="password" name="password" id="password-reg-inp" />
        <input type="submit" value="Register" />
    </form>
{:else}
    Authenticated as {data.user.username} ({data.user.email})
    <a href="/auth/logout">Logout</a>
{/if}
