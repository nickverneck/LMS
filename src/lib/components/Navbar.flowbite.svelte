<script>
  import { onMount } from 'svelte';
  import { DarkMode, Dropdown, DropdownItem, Navbar, NavLi, NavUl, NavBrand, NavHamburger } from 'flowbite-svelte';
  import { theme } from '../../stores/themeStore';

  let currentTheme;
  theme.subscribe(value => {
    currentTheme = value;
  });

  function toggleTheme() {
    theme.update(current => (current === 'light' ? 'dark' : 'light'));
  }

  onMount(() => {
    // Apply initial theme from store
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  });

  $: if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }
</script>

<Navbar fluid class="fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg">
  <NavBrand href="/">
    <img src="/favicon.svg" class="me-3 h-6 sm:h-9" alt="LMS Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">AI LMS</span>
  </NavBrand>
  <div class="flex md:order-2 items-center space-x-3">
    <button on:click={toggleTheme} class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700">
      {#if currentTheme === 'dark'}
        <svg class="w-6 h-6 text-gray-800 dark:text-gray-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
      {:else}
        <svg class="w-6 h-6 text-gray-800 dark:text-gray-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 4a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm-4 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm8-4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4-4a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm-4-4a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm8 8a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM10 18a8 8 0 100-16 8 8 0 000 16z"></path></svg>
      {/if}
    </button>
    <NavHamburger />
  </div>
  <NavUl>
    <NavLi href="/">Home</NavLi>
    <NavLi href="/courses">Courses</NavLi>
    <NavLi href="/auth">Login</NavLi>
<NavLi href="/auth" class="px-3 py-2">Register</NavLi>
  </NavUl>
</Navbar>
