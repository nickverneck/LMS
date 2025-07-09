
<script>
  import Login from '$lib/components/Login.svelte';
  import Register from '$lib/components/Register.svelte';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  let showLogin = true;

  function toggleForm() {
    showLogin = !showLogin;
  }
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
  <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-4xl grid md:grid-cols-2 overflow-hidden" style="height: 600px;">
    <div class="absolute inset-0 grid md:grid-cols-2">
      <div
        class="p-8 relative transition-all duration-800 ease-in-out"
        class:md:order-1={showLogin}
        class:md:order-2={!showLogin}
        class:z-10={showLogin}
        class:z-20={!showLogin}
        in:fly={{ x: showLogin ? 0 : 200, duration: 800, delay: showLogin ? 0 : 400, easing: cubicOut, opacity: 0.5 }}
        out:fly={{ x: showLogin ? -200 : 0, duration: 800, delay: showLogin ? 400 : 0, easing: cubicOut, opacity: 0.5 }}
      >
        {#if showLogin}
          <Login>
            <a href="#" on:click|preventDefault={toggleForm} slot="footer" class="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-600">
              Don't have an account? Register
            </a>
          </Login>
        {:else}
          <Register>
            <a href="#" on:click|preventDefault={toggleForm} slot="footer" class="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-600">
              Already have an account? Login
            </a>
          </Register>
        {/if}
      </div>

      <div
        class="hidden md:block bg-cover bg-center transition-all duration-800 ease-in-out"
        class:md:order-2={showLogin}
        class:md:order-1={!showLogin}
        class:z-20={showLogin}
        class:z-10={!showLogin}
        in:fly={{ x: showLogin ? 0 : -200, duration: 800, delay: showLogin ? 400 : 0, easing: cubicOut, opacity: 0.5 }}
        out:fly={{ x: showLogin ? 200 : 0, duration: 800, delay: showLogin ? 0 : 400, easing: cubicOut, opacity: 0.5 }}
        style="background-image: url(https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
      >
      </div>
    </div>
  </div>
</main>
