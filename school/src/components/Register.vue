<template>
  <div class="authcontainer">
    <div v-if="showPopup" class="cart-popup">{{ popupMessage }}</div>
    <h2>{{ $t('registerTitle') }}</h2>
    <form @submit.prevent="register">
      <input v-model="username" :placeholder="$t('username')" required />
      <input v-model="email" type="email" :placeholder="$t('email')" required />
      <input v-model="password" type="password" :placeholder="$t('password')" required />
      <button type="submit">{{ $t('register') }}</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      showPopup: false,
      popupMessage: ''
    }
  },
  methods: {
    showRegisterPopup(message) {
      this.popupMessage = message
      this.showPopup = true
      setTimeout(() => {
        this.showPopup = false
      }, 2000)
    },
    async register() {
      try {
        await axios.post('http://localhost:3000/api/register', {
          username: this.username, email: this.email, password: this.password
        })
        this.showRegisterPopup(this.$t('registerSuccess'))
        setTimeout(() => {
          this.$router.push('/login')
        }, 1500)
      } catch (e) {
        this.showRegisterPopup(e.response?.data?.message || this.$t('registerFailed'))
      }
    }
  }
}
</script>
<style scoped>
.authcontainer {
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
.authcontainer:hover {
  box-shadow: 0 8px 40px rgba(255,152,0,0.18);
}
.authcontainer h2 {
  color: #203a43;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 18px;
  text-align: center;
}
.authcontainer form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.authcontainer input {
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
.authcontainer button {
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
.authcontainer button:hover {
  background: #e65100;
}
.cart-popup {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff9800;
  color: #fff;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 4px 24px rgba(44,62,80,0.18);
  z-index: 2000;
  animation: fadeInOut 2s;
}
@keyframes fadeInOut {
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
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
