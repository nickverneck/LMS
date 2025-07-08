<script>
  import { onMount } from 'svelte';
  import authStore from '../../stores/authStore';
  import { goto } from '$app/navigation';
  import AdminSidebar from '../../lib/components/AdminSidebar.svelte';
  import { isSidebarOpen } from '../../stores/sidebarStore';
  import { isCollapsed } from '../../stores/sidebarCollapseStore';

  let user = null;

  onMount(() => {
    const unsubscribe = authStore.subscribe(value => {
      user = value.user;
      if (!user) {
        goto('/login'); // Redirect to login if not authenticated
      }
    });

    return unsubscribe;
  });

  let showCreateCourseModal = false;
  let newCourseTitle = '';
  let newCourseDescription = '';
  let newCoursePrice = 0;
  let createCourseError = null;

  async function handleCreateCourse() {
    createCourseError = null;
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${$authStore.token}`,
        },
        body: JSON.stringify({
          title: newCourseTitle,
          description: newCourseDescription,
          price: parseFloat(newCoursePrice),
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to create course');
      }

      alert('Course created successfully!');
      showCreateCourseModal = false;
      newCourseTitle = '';
      newCourseDescription = '';
      newCoursePrice = 0;
      // Optionally, refresh course list or redirect
    } catch (e) {
      createCourseError = e.message;
      console.error('Create course error:', e);
    }
  }
</script>

<main class="flex">
  {#if user && (user.role === 'admin' || user.role === 'instructor')}
    <AdminSidebar />
  {/if}

  <div class="flex-grow container mx-auto p-4" class:ml-64={user && (user.role === 'admin' || user.role === 'instructor') && !$isCollapsed} class:ml-16={user && (user.role === 'admin' || user.role === 'instructor') && $isCollapsed}>
    {#if user}
      <h1 class="text-3xl font-bold mb-6">Welcome, {user.firstName}!</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Enrolled Courses Section -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Enrolled Courses</h2>
          <p>Display enrolled courses here.</p>
          <!-- TODO: Fetch and display actual enrolled courses -->
        </div>

        <!-- Progress Overview Section -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Progress Overview</h2>
          <p>Display progress in courses here.</p>
          <!-- TODO: Fetch and display actual progress -->
        </div>

        <!-- Quick Links / Actions -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
          <ul>
            <li class="mb-2"><a href="/settings" class="text-indigo-600 hover:underline">Account Settings</a></li>
            <li class="mb-2"><button on:click={() => authStore.logout()} class="text-red-600 hover:underline">Sign Out</button></li>
          </ul>
        </div>
      </div>

      <!-- Role-specific content (e.g., Instructor Dashboard link) -->
      {#if user.role === 'instructor' || user.role === 'admin'}
        <div class="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Instructor Tools</h2>
          <button on:click={() => showCreateCourseModal = true} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Create New Course
          </button>
        </div>
      {/if}

      {#if user.role === 'admin'}
        <div class="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Admin Tools</h2>
          <p><a href="/admin/dashboard" class="text-indigo-600 hover:underline">Go to Admin Dashboard</a></p>
        </div>
      {/if}

    {:else}
      <p>Loading user data...</p>
    {/if}
  </div>
</main>

{#if showCreateCourseModal}
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Create New Course</h2>
      {#if createCourseError}
        <p class="text-red-500 mb-4">{createCourseError}</p>
      {/if}
      <form on:submit|preventDefault={handleCreateCourse}>
        <div class="mb-4">
          <label for="courseTitle" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Title:</label>
          <input type="text" id="courseTitle" bind:value={newCourseTitle} required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
        </div>
        <div class="mb-4">
          <label for="courseDescription" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Description:</label>
          <textarea id="courseDescription" bind:value={newCourseDescription} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"></textarea>
        </div>
        <div class="mb-4">
          <label for="coursePrice" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Price:</label>
          <input type="number" id="coursePrice" bind:value={newCoursePrice} min="0" step="0.01" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
        </div>
        <div class="flex justify-end">
          <button type="button" on:click={() => showCreateCourseModal = false} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">Cancel</button>
          <button type="submit" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Create Course</button>
        </div>
      </form>
    </div>
  </div>
{/if}