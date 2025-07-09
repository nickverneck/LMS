<script>
  import { onMount } from 'svelte';
  import { theme } from '../../stores/themeStore';
  import authStore, { logout } from '../../stores/authStore';
  import { fly } from 'svelte/transition';

  let currentTheme;
  theme.subscribe(value => {
    currentTheme = value;
  });

  onMount(() => {
    // Apply initial theme from store
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  });

  $: if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }

  let isMenuOpen = false;
  let isUserDropdownOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function toggleUserDropdown() {
    isUserDropdownOpen = !isUserDropdownOpen;
  }

  function handleLogout() {
    logout();
    isUserDropdownOpen = false; // Close dropdown after logout
  }

  let searchQuery = '';

  function handleSearch() {
    // TODO: Implement actual search logic, e.g., redirect to /courses?search=query
    console.log('Searching for:', searchQuery);
  }
</script>

<nav class="fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="/favicon.svg" class="h-8" alt="LMS Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AI LMS</span>
    </a>

    <!-- Search Bar (Middle) -->
    <div class="flex-grow mx-4 hidden md:block">
      <form on:submit|preventDefault={handleSearch} class="max-w-md mx-auto">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="search" id="default-search" bind:value={searchQuery} class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="Search courses..." required />
          <button type="submit" class="text-white absolute end-2.5 bottom-1.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Search</button>
        </div>
      </form>
    </div>

    <div class="flex md:order-2 items-center space-x-3 rtl:space-x-reverse">
      {#if $authStore.user}
        <!-- User Dropdown -->
        <div class="relative">
          <button type="button" on:click={toggleUserDropdown} class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="{isUserDropdownOpen ? 'true' : 'false'}">
            <span class="sr-only">Open user menu</span>
            <div class="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg class="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            </div>
          </button>
          {#if isUserDropdownOpen}
            <div transition:fly={{ y: -10, duration: 150 }} class="z-50 absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
              <div class="px-4 py-3">
                <span class="block text-sm text-gray-900 dark:text-white">{$authStore.user.firstName} {$authStore.user.lastName}</span>
                <span class="block text-sm text-gray-500 truncate dark:text-gray-400">{$authStore.user.email}</span>
              </div>
              <ul class="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a href="/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <button on:click={handleLogout} class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                </li>
              </ul>
            </div>
          {/if}
        </div>
      {:else}
        <a href="/auth" class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Login / Register</a>
      {/if}

      <button type="button" on:click={toggleMenu} class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="{isMenuOpen ? 'true' : 'false'}">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
    </div>

    <div class="items-center justify-between {isMenuOpen ? '' : 'hidden'} w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
      <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="/" class="block py-2 px-3 text-white bg-indigo-700 rounded md:bg-transparent md:text-indigo-700 md:p-0 md:dark:text-indigo-500" aria-current="page">Home</a>
        </li>
        <li>
          <a href="/courses" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Courses</a>
        </li>
      </ul>
    </div>
  </div>
</nav>