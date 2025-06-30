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

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #1f2937;
    text-align: center;
    margin-bottom: 2rem;
  }

  .error-message {
    color: red;
    text-align: center;
  }

  .no-courses-message {
    text-align: center;
    color: #4b5563;
  }

  .course-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .course-card {
    border: 1px solid #d1d5db;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease;
  }

  .course-card:hover {
    transform: scale(1.02);
  }

  .course-card h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .course-card p {
    color: #374151;
    margin-bottom: 1rem;
  }

  .course-card .price {
    font-size: 1.25rem;
    font-weight: bold;
    color: #2563eb;
    margin-bottom: 1rem;
    display: block;
  }

  .course-card a {
    display: inline-block;
    background-color: #3b82f6;
    color: white;
    text-align: center;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    transition: background-color 0.3s ease;
    text-decoration: none;
  }

  .course-card a:hover {
    background-color: #2563eb;
  }
</style>

<main class="container">
  <h1>Course Catalog</h1>

  {#if error}
    <p class="error-message">{error}</p>
  {:else if courses.length === 0}
    <p class="no-courses-message">No courses available yet.</p>
  {:else}
    <div class="course-list">
      {#each courses as course}
        <div class="course-card">
          <h2>{course.title}</h2>
          <p class="instructor-info">Instructor: {course.instructorFirstName} {course.instructorLastName}</p>
          <p class="price">Price: ${course.price}</p>
          <a href="/courses/{course.id}">View Details</a>
        </div>
      {/each}
    </div>
  {/if}
</main>