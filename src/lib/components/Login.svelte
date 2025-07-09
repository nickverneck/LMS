
<script>
  import { goto } from '$app/navigation';
  import { login } from '../../stores/authStore';

  let email = '';
  let password = '';
  let error = null;

  async function handleLogin() {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Login failed');
      }

      const data = await response.json();
      login(data.token, data.user);
      goto('/'); // Redirect to home or dashboard
    } catch (e) {
      error = e.message;
      console.error('Login error:', e);
    }
  }
</script>

<div class="p-8 rounded-lg shadow-md w-full max-w-md">
  <h1 class="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-50">Login</h1>

  {#if error}
    <p class="text-red-500 text-center mb-4">{error}</p>
  {/if}

  <form on:submit|preventDefault={handleLogin}>
    <div class="mb-4">
      <label for="email" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email:</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      />
    </div>
    <div class="mb-6">
      <label for="password" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Password:</label>
      <input
        type="password"
        id="password"
        bind:value={password}
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      />
    </div>
    <div class="flex items-center justify-between">
      <button
        type="submit"
        class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
      <slot name="footer"></slot>
    </div>
  </form>
</div>
