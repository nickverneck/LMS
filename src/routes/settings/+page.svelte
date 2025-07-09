<script>
  import { onMount } from 'svelte';
  import authStore from '../../stores/authStore';
  import { goto } from '$app/navigation';

  let user = null;

  onMount(() => {
    const unsubscribe = authStore.subscribe(value => {
      user = value.user;
      if (!user) {
        goto('/auth'); // Redirect to login if not authenticated
      }
    });

    return unsubscribe;
  });

  let firstName = '';
  let lastName = '';
  let email = '';

  $: if (user) {
    firstName = user.firstName;
    lastName = user.lastName;
    email = user.email;
  }

  async function handleUpdateProfile() {
    // TODO: Implement profile update logic
    console.log('Update profile:', { firstName, lastName, email });
    alert('Profile update not yet implemented!');
  }
</script>

<main class="container mx-auto p-4">
  {#if user}
    <h1 class="text-3xl font-bold mb-6">Account Settings</h1>

    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <form on:submit|preventDefault={handleUpdateProfile}>
        <div class="mb-4">
          <label for="firstName" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">First Name:</label>
          <input
            type="text"
            id="firstName"
            bind:value={firstName}
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
        </div>
        <div class="mb-4">
          <label for="lastName" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Last Name:</label>
          <input
            type="text"
            id="lastName"
            bind:value={lastName}
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
        </div>
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
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>

  {:else}
    <p>Loading user data...</p>
  {/if}
</main>