<template>
  <div class="auth-container">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Username" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() { return { username: '', email: '', password: '', error: '' }; },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:3000/api/register', {
          username: this.username, email: this.email, password: this.password
        });
        this.$router.push('/login');
      } catch (e) {
        this.error = e.response?.data?.message || 'Registration failed';
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
