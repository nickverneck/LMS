import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const authStore = writable({
  token: null,
  user: null,
});

if (browser) {
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  if (storedToken && storedUser) {
    try {
      authStore.set({ token: storedToken, user: JSON.parse(storedUser) });
    } catch (e) {
      console.error("Failed to parse stored user data:", e);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}

export default authStore;

export const login = (token, user) => {
  if (browser) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  authStore.set({ token, user });
};

export const logout = () => {
  if (browser) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  authStore.set({ token: null, user: null });
};
