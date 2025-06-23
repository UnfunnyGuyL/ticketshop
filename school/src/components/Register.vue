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
        alert('Registration successful! You can now log in.');
        this.$router.push('/login');
      } catch (e) {
        this.error = e.response?.data?.message || 'Registration failed';
        alert(this.error);
      }
    }
  }
}
</script>
<style scoped>
.auth-container {
  max-width: 400px;
  min-height: unset;
  margin: 60px auto;
  background: linear-gradient(135deg, #f8fafc 60%, #ffe0b2 100%);
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(44,62,80,0.13);
  padding: 40px 36px 36px 36px;
  border: 2px solid #ff9800;
  text-align: left;
  box-sizing: border-box;
  display: block;
  transition: box-shadow 0.2s;
}
.auth-container:hover {
  box-shadow: 0 8px 40px rgba(255,152,0,0.18);
}
.auth-container h2 {
  color: #203a43;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 18px;
  text-align: center;
}
.auth-container form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.auth-container input {
  display: block;
  width: 80%;
  margin-bottom: 18px;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1.5px solid #e0e7ff;
  font-size: 1rem;
  box-sizing: border-box;
  text-align: center;
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
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  background: #f8f8f8;
  border-top: 1.5px solid #e0e7ff;
  color: #23272f;
  text-align: center;
  padding: 16px 0 10px 0;
  font-size: 1rem;
  z-index: 100;
}
</style>
