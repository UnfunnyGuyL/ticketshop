<template>
  <div class="cart-container">
    <div v-if="showPopup" class="cart-popup">{{ popupMessage }}</div>
    <h1>{{ $t('cartTitle') }}</h1>
    <div v-if="cart.length === 0" class="cart-empty">
      <p>{{ $t('cartEmpty') }}</p>
    </div>
    <div v-else>
      <table class="cart-table">
        <thead>
          <tr>
            <th>{{ $t('event') }}</th>
            <th>{{ $t('date') }}</th>
            <th>{{ $t('location') }}</th>
            <th>{{ $t('quantity') }}</th>
            <th>{{ $t('remove') }}</th>
            <th>{{ $t('price') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in cart" :key="item.id">
            <td>{{ $t('eventNames.' + item.title) !== 'eventNames.' + item.title ? $t('eventNames.' + item.title) : item.title }}</td>
            <td>{{ item.date.split('T')[0] }}</td>
            <td>{{ item.location }}</td>
            <td>
              <button @click="decrement(idx)" :disabled="item.quantity <= 1">-</button>
              <span class="cart-qty">{{ item.quantity }}</span>
              <button @click="increment(idx)">+</button>
            </td>
            <td>
              <button @click="remove(idx)">{{ $t('remove') }}</button>
            </td>
            <td>{{ formatPrice(item.price) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="cart-total-row">
        <span class="cart-total-label">{{$t('total')}}</span>
        <span class="cart-total-value">{{ formatPrice(totalPrice) }}</span>
      </div>
      <div class="cart-checkout-row">
        <button class="cart-checkout-btn" @click="goToCheckout">{{$t('checkout')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'UserCart',
  data() {
    return {
      cart: [],
      showPopup: false,
      popupMessage: ''
    }
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
    }
  },
  async mounted() {
    await this.syncCart();
    window.addEventListener('storage', this.onStorageChange);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.onStorageChange);
  },
  methods: {
    formatPrice(price) {
      return '€' + Number(price).toFixed(2);
    },
    async syncCart() {
      const token = localStorage.getItem('token');
      if (token) {
        await this.loadCart();
      } else {
        const localCart = localStorage.getItem('cart');
        this.cart = localCart ? JSON.parse(localCart) : [];
      }
    },
    showCartPopup(messageKey) {
      this.popupMessage = this.$t(messageKey);
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false;
      }, 2000);
    },
    increment(idx) {
      this.cart[idx].quantity++;
      this.saveCart(true);
      this.showCartPopup('cartQuantityIncreased');
    },
    decrement(idx) {
      if (this.cart[idx].quantity > 1) {
        this.cart[idx].quantity--;
        this.saveCart(true);
        this.showCartPopup('cartQuantityDecreased');
      }
    },
    remove(idx) {
      this.cart.splice(idx, 1);
      this.saveCart(true);
      this.showCartPopup('cartItemRemoved');
    },
    saveCart(immediate = false) {
      const token = localStorage.getItem('token');
      if (token) {
        axios.post('http://localhost:3000/api/cart', { cart: this.cart }, {
          headers: { Authorization: 'Bearer ' + token }
        }).then(() => {
          if (immediate) this.loadCart();
        });
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    },
    async loadCart() {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axios.get('http://localhost:3000/api/cart', {
          headers: { Authorization: 'Bearer ' + token }
        });
        this.cart = res.data.cart || [];
      } catch (e) {
        this.cart = [];
      }
    },
    goToCheckout() {
      this.$router.push('/checkout');
    }
  }
}
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 40px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(44,62,80,0.10);
  padding: 36px 32px 32px 32px;
  border: 1.5px solid #e0e7ff;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.cart-container h1 {
  color: #203a43;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 18px;
}
.cart-empty {
  color: #888;
  text-align: center;
  padding: 40px 0;
}
.cart-table {
  width: 100%;
  border-collapse: collapse;
}
.cart-table th, .cart-table td {
  padding: 12px 8px;
  text-align: left;
}
.cart-table th {
  background: #f9f9f9;
  color: #203a43;
}
.cart-table tr:nth-child(even) {
  background: #f5f7fa;
}
.cart-qty {
  display: inline-block;
  min-width: 32px;
  text-align: center;
}
.cart-table button {
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 1rem;
  cursor: pointer;
  margin: 0 2px;
  transition: background 0.18s;
}
.cart-table button:disabled {
  background: #eee;
  color: #aaa;
  cursor: not-allowed;
}
.cart-table button:hover:not(:disabled) {
  background: #e65100;
}
.cart-total-row {
  margin-top: 24px;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
}
.cart-total-label {
  font-weight: 600;
}
.cart-total-value {
  color: #203a43;
  font-weight: 700;
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
.cart-checkout-row {
  margin-top: 16px;
  text-align: right;
}
.cart-checkout-btn {
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.18s;
}
.cart-checkout-btn:hover {
  background: #388e3c;
}
@keyframes fadeInOut {
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
}
body, #app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Ensure footer is always at the bottom */
footer.footer {
  margin-top: auto;
}
</style>
