<script>
  import { goto } from '\$app/navigation';

  let firstName = '';
  let lastName = '';
  let email = '';
  let confirmEmail = '';
  let password = '';
  let confirmPassword = '';
  let error = null;
  let success = null;

  async function handleRegister() {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, confirmEmail, password, confirmPassword }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Registration failed');
      }

      success = 'Registration successful! You can now log in.';
      error = null;
      firstName = '';
      lastName = '';
      email = '';
      confirmEmail = '';
      password = '';
      confirmPassword = '';
      
      setTimeout(() => {
        goto('/login');
      }, 2000);

    } catch (e) {
      error = e.message;
      success = null;
      console.error('Registration error:', e);
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

  .success-message {
    color: #22c55e;
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
    background-color: #22c55e;
  }

  .button-primary:hover {
    background-color: #16a34a;
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
    <h1 class="title">Register</h1>

    {#if error}
      <p class="error-message">{error}</p>
    {/if}

    {#if success}
      <p class="success-message">{success}</p>
    {/if}

    <form on:submit|preventDefault={handleRegister}>
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" bind:value={firstName} required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" bind:value={lastName} required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required />
      </div>
      <div class="form-group">
        <label for="confirmEmail">Confirm Email:</label>
        <input type="email" id="confirmEmail" bind:value={confirmEmail} required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" bind:value={confirmPassword} required />
      </div>
      <div class="form-actions">
        <button type="submit" class="button button-primary">
          Register
        </button>
        <a href="/login" class="link">
          Already have an account? Login
        </a>
      </div>
    </form>
  </div>
</main>