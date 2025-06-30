<script>
  import { goto } from '\$app/navigation';
  import { onMount } from 'svelte';

  let email = '';
  let password = '';
  let error = null;

  async function handleLogin() {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      goto('/'); // Redirect to home or dashboard
    } catch (e) {
      error = e.message;
      console.error('Login error:', e);
    }
  }
</script>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f3f4f6;
  }

  .card {
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    width: 100%;
    max-width: 28rem;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #1f2937;
  }

  .error-message {
    color: #ef4444;
    text-align: center;
    margin-bottom: 1rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    color: #374151;
    font-size: 0.875rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .form-group input {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    appearance: none;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    color: #374151;
    line-height: 1.25;
    outline: none;
  }

  .form-group input:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }

  .form-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    outline: none;
  }

  .button-primary {
    background-color: #3b82f6;
  }

  .button-primary:hover {
    background-color: #2563eb;
  }

  .link {
    display: inline-block;
    font-size: 0.875rem;
    color: #3b82f6;
    text-decoration: none;
  }

  .link:hover {
    color: #2563eb;
  }
</style>

<main class="container">
  <div class="card">
    <h1 class="title">Login</h1>

    {#if error}
      <p class="error-message">{error}</p>
    {/if}

    <form on:submit|preventDefault={handleLogin}>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required />
      </div>
      <div class="form-actions">
        <button type="submit" class="button button-primary">
          Login
        </button>
        <a href="/register" class="link">
          Don't have an account? Register
        </a>
      </div>
    </form>
  </div>
</main>