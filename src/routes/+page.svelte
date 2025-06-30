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
  <section class="text-center mb-12">
    <h1 class="text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4">Learn AI from the Best</h1>
    <p class="text-xl text-gray-700 dark:text-gray-300">Live, interactive courses taught by industry experts.</p>
    <a href="/courses" class="mt-6 inline-block bg-indigo-600 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300">Explore All Courses</a>
  </section>

  <section class="mb-12">
    <h2 class="text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-8">Featured AI Courses</h2>
    {#if error}
      <p class="text-red-500 text-center">{error}</p>
    {:else if courses.length === 0}
      <p class="text-center text-gray-600 dark:text-gray-400">No courses available yet. Please check back later!</p>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each courses as course}
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 backdrop-filter backdrop-blur-lg bg-opacity-70 dark:bg-opacity-70 border border-gray-200 dark:border-gray-700">
            <div class="p-6">
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{course.title}</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">Instructor: {course.instructorFirstName} {course.instructorLastName}</p>
              <p class="text-gray-700 dark:text-gray-300 mb-4">{course.description}</p>
              <div class="flex justify-between items-center mb-4">
                <span class="text-xl font-bold text-indigo-600 dark:text-indigo-400">${course.price}</span>
                {#if course.discount}
                  <span class="text-emerald-600 dark:text-emerald-400 font-semibold">{course.discount}% Off!</span>
                {/if}
              </div>
              <a href="/courses/{course.id}" class="block w-full bg-indigo-500 text-white text-center py-2 rounded-lg hover:bg-indigo-600 transition duration-300">View Course</a>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <section class="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-70 dark:bg-opacity-70 border border-gray-200 dark:border-gray-700">
    <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Ready to Start Your AI Journey?</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">Join our community of AI enthusiasts and learn from the best.</p>
    <a href="/register" class="inline-block bg-emerald-600 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-emerald-700 transition duration-300">Sign Up Now</a>
  </section>
</main>
