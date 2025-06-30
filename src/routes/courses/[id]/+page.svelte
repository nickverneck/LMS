<script>
  import { onMount } from 'svelte';
  import { page } from '\$app/stores';

  let course = null;
  let error = null;

  onMount(async () => {
    const courseId = $page.params.id;
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      course = await response.json();
    } catch (e) {
      error = e.message;
      console.error('Failed to fetch course details:', e);
    }
  });
</script>

<main>
  {#if error}
    <p style="color: red;">{error}</p>
  {:else if !course}
    <p>Loading course details...</p>
  {:else}
    <h1>{course.title}</h1>
    <p><strong>Instructor:</strong> {course.instructorFirstName} {course.instructorLastName}</p>
    <p><strong>Description:</strong> {course.description}</p>
    <p><strong>Price:</strong> ${course.price}</p>
    <!-- TODO: Display modules, lessons, live sessions -->
  {/if}
</main>
