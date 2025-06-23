<template>
  <div class="checkout-container">
    <h1>{{ $t('orderPlacedTitle') }}</h1>
    <p>{{ $t('orderPlacedMessage') }}</p>
    <div v-if="error" class="checkout-error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Checkout',
  data() {
    return {
      error: ''
    }
  },
  async mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = this.$t('loginRequiredToOrder');
      setTimeout(() => {
        this.$router.replace('/login');
      }, 1800);
      return;
    }
    try {
      // Fetch cart from backend
      const res = await axios.get('http://localhost:3000/api/cart', {
        headers: { Authorization: 'Bearer ' + token }
      });
      const cart = res.data.cart || [];
      const username = localStorage.getItem('username') || 'unknown';
      if (cart.length === 0) return;
      // Send order to backend
      await axios.post('http://localhost:3000/api/orders', {
        username,
        items: cart
      }, { headers: { Authorization: 'Bearer ' + token } });
      // Clear cart
      await axios.post('http://localhost:3000/api/cart', { cart: [] }, {
        headers: { Authorization: 'Bearer ' + token }
      });
    } catch (e) {
      this.error = this.$t('orderFailed') + (e.response?.data?.message ? ': ' + e.response.data.message : '');
    }
  }
}
</script>

<style scoped>
.checkout-container {
  max-width: 600px;
  margin: 80px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(44,62,80,0.10);
  padding: 48px 36px 40px 36px;
  border: 1.5px solid #e0e7ff;
  text-align: center;
}
.checkout-container h1 {
  color: #203a43;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 18px;
}
.checkout-container p {
  color: #23272f;
  font-size: 1.2rem;
}
.checkout-error {
  color: #e63946;
  margin-top: 20px;
  font-weight: 500;
}
</style>
