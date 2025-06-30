<script>
  import '../app.css';
</script>

<nav style="background-color: #1f2937; padding: 1rem;">
  <ul style="display: flex; space-x: 1rem; color: white;">
    <li style="margin-right: 1rem;"><a href="/" style="color: white; text-decoration: none;">Home</a></li>
    <li style="margin-right: 1rem;"><a href="/courses" style="color: white; text-decoration: none;">Courses</a></li>
    <li style="margin-right: 1rem;"><a href="/login" style="color: white; text-decoration: none;">Login</a></li>
    <li style="margin-right: 1rem;"><a href="/register" style="color: white; text-decoration: none;">Register</a></li>
    <!-- Add more navigation links as needed -->
  </ul>
</nav>

<main style="padding: 1rem;">
  <slot />
</main>
