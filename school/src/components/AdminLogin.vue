<template>
  <div class="auth-container">
    <h2>{{ $t('adminLoginTitle') }}</h2>
    <form @submit.prevent="login">
      <input v-model="username" :placeholder="$t('username')" required />
      <input v-model="password" type="password" :placeholder="$t('password')" required />
      <button type="submit">{{ $t('login') }}</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AdminLogin',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      if (this.username === 'admin' && this.password === 'admin') {
        try {
          const res = await axios.post('http://localhost:3000/api/login', {
            username: this.username,
            password: this.password
          });
          if (res.data && res.data.token) {
            localStorage.setItem('adminToken', res.data.token);
            this.$router.push('/admin-panel');
          } else {
            this.error = this.$t('loginFailed');
          }
        } catch (e) {
          this.error = this.$t('loginFailed');
        }
      } else {
        this.error = this.$t('adminForbidden');
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 60px auto;
  background: linear-gradient(135deg, #f8fafc 60%, #ffe0b2 100%);
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(44,62,80,0.13);
  padding: 40px 36px 36px 36px;
  border: 2px solid #ff9800;
  text-align: left;
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
</style>
