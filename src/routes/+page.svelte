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

  .hero-section {
    text-align: center;
    margin-bottom: 3rem;
  }

  .hero-section h1 {
    font-size: 3rem;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .hero-section p {
    font-size: 1.25rem;
    color: #374151;
  }

  .explore-button {
    margin-top: 1.5rem;
    display: inline-block;
    background-color: #2563eb;
    color: white;
    font-size: 1.125rem;
    font-weight: 600;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: background-color 0.3s ease;
    text-decoration: none;
  }

  .explore-button:hover {
    background-color: #1d4ed8;
  }

  .featured-courses-section {
    margin-bottom: 3rem;
  }

  .featured-courses-section h2 {
    font-size: 2.25rem;
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

  .course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .course-card {
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: transform 0.3s ease;
  }

  .course-card:hover {
    transform: scale(1.02);
  }

  .course-card-content {
    padding: 1.5rem;
  }

  .course-card h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .course-card .instructor-info {
    color: #4b5563;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .course-card .description {
    color: #374151;
    margin-bottom: 1rem;
  }

  .course-card .price-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .course-card .price {
    font-size: 1.25rem;
    font-weight: bold;
    color: #2563eb;
  }

  .course-card .discount {
    color: #10b981;
    font-weight: 600;
  }

  .view-course-button {
    display: block;
    width: 100%;
    background-color: #3b82f6;
    color: white;
    text-align: center;
    padding: 0.5rem 0;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease;
    text-decoration: none;
  }

  .view-course-button:hover {
    background-color: #2563eb;
  }

  .cta-section {
    text-align: center;
    padding: 3rem;
    background-color: #f3f4f6;
    border-radius: 0.5rem;
  }

  .cta-section h2 {
    font-size: 1.875rem;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .cta-section p {
    font-size: 1.125rem;
    color: #374151;
    margin-bottom: 1.5rem;
  }

  .signup-button {
    display: inline-block;
    background-color: #10b981;
    color: white;
    font-size: 1.125rem;
    font-weight: 600;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: background-color 0.3s ease;
    text-decoration: none;
  }

  .signup-button:hover {
    background-color: #059669;
  }
</style>

<main class="container">
  <section class="hero-section">
    <h1>Learn AI from the Best</h1>
    <p>Live, interactive courses taught by industry experts.</p>
    <a href="/courses" class="explore-button">Explore All Courses</a>
  </section>

  <section class="featured-courses-section">
    <h2>Featured AI Courses</h2>
    {#if error}
      <p class="error-message">{error}</p>
    {:else if courses.length === 0}
      <p class="no-courses-message">No courses available yet. Please check back later!</p>
    {:else}
      <div class="course-grid">
        {#each courses as course}
          <div class="course-card">
            <div class="course-card-content">
              <h3>{course.title}</h3>
              <p class="instructor-info">Instructor: {course.instructorFirstName} {course.instructorLastName}</p>
              <p class="description">{course.description}</p>
              <div class="price-info">
                <span class="price">${course.price}</span>
                {#if course.discount}
                  <span class="discount">{course.discount}% Off!</span>
                {/if}
              </div>
              <a href="/courses/{course.id}" class="view-course-button">View Course</a>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <section class="cta-section">
    <h2>Ready to Start Your AI Journey?</h2>
    <p>Join our community of AI enthusiasts and learn from the best.</p>
    <a href="/register" class="signup-button">Sign Up Now</a>
  </section>
</main>
