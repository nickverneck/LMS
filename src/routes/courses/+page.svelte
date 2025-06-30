<script>
  import { onMount } from 'svelte';

  let courses = [];
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch('/api/courses');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      courses = await response.json();
    } catch (e) {
      error = e.message;
      console.error('Failed to fetch courses:', e);
    }
  });
</script>

<main class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50">Course Catalog</h1>

  {#if error}
    <p class="text-red-500 text-center">{error}</p>
  {:else if courses.length === 0}
    <p class="text-center text-gray-600 dark:text-gray-400">No courses available yet.</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each courses as course}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 backdrop-filter backdrop-blur-lg bg-opacity-70 dark:bg-opacity-70 border border-gray-200 dark:border-gray-700">
          <div class="p-6">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{course.title}</h2>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">Instructor: {course.instructorFirstName} {course.instructorLastName}</p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">{course.description}</p>
            <p class="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">Price: ${course.price}</p>
            <a href="/courses/{course.id}" class="block w-full bg-indigo-500 text-white text-center py-2 rounded-lg hover:bg-indigo-600 transition duration-300">View Details</a>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>