<template>
  <div class="auth-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() { return { username: '', password: '', error: '' }; },
  methods: {
    async login() {
      try {
        // Change URL to your backend API
        const res = await axios.post('http://localhost:3000/api/login', {
          username: this.username, password: this.password
        });
        localStorage.setItem('token', res.data.token);
        this.$router.push('/');
      } catch (e) {
        this.error = e.response?.data?.message || 'Login failed';
      }
    }
  }
}
</script>
<style scoped>
.auth-container {
  max-width: 400px;
  margin: 60px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(44,62,80,0.10);
  padding: 36px 32px 32px 32px;
  border: 1.5px solid #e0e7ff;
  text-align: left;
}
.auth-container h2 {
  color: #203a43;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 18px;
}
.auth-container input {
  display: block;
  width: 100%;
  margin-bottom: 18px;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1.5px solid #e0e7ff;
  font-size: 1rem;
}
.auth-container button {
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.18s;
}
.auth-container button:hover {
  background: #e65100;
}
.error {
  color: #e65100;
  margin-top: 10px;
}
</style>
