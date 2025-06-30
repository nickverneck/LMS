<script>
  import '../app.css';
  import Navbar from '../lib/components/Navbar.svelte';
  import { theme } from '../stores/themeStore';

  // Apply theme class to html element
  theme.subscribe(value => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(value);
    }
  });
</script>

<div class="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
  <Navbar />
  <main class="pt-20 p-4">
    <slot />
  </main>
</div>
