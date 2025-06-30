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

<main>
  <h1>Course Catalog</h1>

  {#if error}
    <p style="color: red;">{error}</p>
  {:else if courses.length === 0}
    <p>No courses available yet.</p>
  {:else}
    <div class="course-list">
      {#each courses as course}
        <div class="course-card">
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <p>Price: ${course.price}</p>
          <a href="/courses/{course.id}">View Details</a>
        </div>
      {/each}
    </div>
  {/if}
</main>

<style>
  .course-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .course-card {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  }
</style>
