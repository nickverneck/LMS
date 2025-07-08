<script>
  import { writable } from 'svelte/store';
  import { fly } from 'svelte/transition';
  import { Sidebar, SidebarGroup, SidebarItem, SidebarBrand } from 'flowbite-svelte';
  import { isSidebarOpen } from '../../stores/sidebarStore';
  import { isCollapsed } from '../../stores/sidebarCollapseStore';

  let showAdminTools = true; // State for Admin Tools collapse

  function toggleAdminTools() {
    showAdminTools = !showAdminTools;
  }

  function toggleSidebarCollapse() {
    isCollapsed.update(value => !value);
  }

  function toggleSidebar() {
    isSidebarOpen.update(value => !value);
  }
</script>

<aside class="fixed top-0 left-0 z-40 h-screen transition-transform md:translate-x-0 {isCollapsed ? 'w-16' : 'w-64'}" class:translate-x-0={$isSidebarOpen} aria-label="Sidebar">
  <Sidebar {isCollapsed} class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
    <SidebarBrand href="/" name="AI LMS" class="mb-5">
      <img src="/favicon.svg" class="h-8" alt="LMS Logo" />
    </SidebarBrand>

    <SidebarGroup>
      <SidebarItem href="/dashboard" label="Dashboard" active={true}>
        <div slot="icon" class="w-5 h-5">🏠</div>
      </SidebarItem>

      <!-- Admin Tools Section (Manually Collapsible) -->
      <div class="mt-4">
        <button on:click={toggleAdminTools} class="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <span class="flex-shrink-0 w-5 h-5">🛠️</span>
          <span class="flex-1 ms-3 text-left whitespace-nowrap">Admin Tools</span>
          <svg class="w-3 h-3 transition-transform" class:rotate-90={showAdminTools} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>
        {#if showAdminTools}
          <ul class="py-2 space-y-2">
            <li>
              <a href="/admin/users" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <span class="ms-3">👥 Manage Users</span>
              </a>
            </li>
            <li>
              <a href="/admin/courses" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <span class="ms-3">📚 Manage Courses</span>
              </a>
            </li>
            <li>
              <a href="/admin/analytics" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <span class="ms-3">📊 View Analytics</span>
              </a>
            </li>
          </ul>
        {/if}
      </div>
    </SidebarGroup>

    <div class="absolute bottom-4 left-4">
      <button on:click={toggleSidebarCollapse} class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
        {#if $isCollapsed}
          <div class="w-5 h-5 text-gray-500 dark:text-gray-400">➡️</div>
        {:else}
          <div class="w-5 h-5 text-gray-500 dark:text-gray-400">⬅️</div>
        {/if}
      </button>
    </div>
  </Sidebar>
</aside>

<button type="button" on:click={toggleSidebar} class="fixed top-20 left-4 z-50 inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
  <span class="sr-only">Toggle sidebar</span>
  <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
  </svg>
</button>

{#if $isSidebarOpen}
  <button type="button" on:click={toggleSidebar} class="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 md:hidden" aria-label="Close sidebar"></button>
{/if}