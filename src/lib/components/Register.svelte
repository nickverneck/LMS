
<script>
  import { goto } from '$app/navigation';
  import { login } from '../../stores/authStore';

  let firstName = '';
  let lastName = '';
  let email = '';
  let confirmEmail = '';
  let password = '';
  let confirmPassword = '';
  let error = null;
  let success = null;

  async function handleRegister() {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, confirmEmail, password, confirmPassword }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Registration failed');
      }

      const data = await response.json();
      login(data.token, data.user); // Assuming registration also logs in and returns a token
      success = 'Registration successful! You are now logged in.';
      error = null;
      firstName = '';
      lastName = '';
      email = '';
      confirmEmail = '';
      password = '';
      confirmPassword = '';
      
      setTimeout(() => {
        goto('/');
      }, 2000);

    } catch (e) {
      error = e.message;
      success = null;
      console.error('Registration error:', e);
    }
  }
</script>

<div class="p-6 rounded-lg shadow-md w-full max-w-md">
  <h1 class="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-50">Register</h1>

  {#if error}
    <p class="text-red-500 text-center mb-2">{error}</p>
  {/if}

  {#if success}
    <p class="text-emerald-500 text-center mb-2">{success}</p>
  {/if}

  <form on:submit|preventDefault={handleRegister}>
    <div class="grid grid-cols-2 gap-4">
      <div class="mb-2">
        <label for="firstName" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">First Name:</label>
        <input
          type="text"
          id="firstName"
          bind:value={firstName}
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
      </div>
      <div class="mb-2">
        <label for="lastName" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Last Name:</label>
        <input
          type="text"
          id="lastName"
          bind:value={lastName}
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
      </div>
    </div>
    <div class="mb-2">
      <label for="email" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Email:</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      />
    </div>
    <div class="mb-2">
      <label for="confirmEmail" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Confirm Email:</label>
      <input
        type="email"
        id="confirmEmail"
        bind:value={confirmEmail}
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="mb-2">
        <label for="password" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Password:</label>
        <input
          type="password"
          id="password"
          bind:value={password}
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
      </div>
      <div class="mb-2">
        <label for="confirmPassword" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          bind:value={confirmPassword}
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
      </div>
    </div>
    <div class="flex items-center justify-between mt-4">
      <button
        type="submit"
        class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Register
      </button>
      <slot name="footer"></slot>
    </div>
  </form>
</div>
