<template>
  <div class="cart-container">
    <h1>{{$t('cartTitle')}}</h1>
    <div v-if="cart.length === 0" class="cart-empty">
      <p>{{$t('cartEmpty')}}</p>
    </div>
    <div v-else>
      <table class="cart-table">
        <thead>
          <tr>
            <th>{{$t('cartEvent')}}</th>
            <th>{{$t('cartDate')}}</th>
            <th>{{$t('cartLocation')}}</th>
            <th>{{$t('cartQuantity')}}</th>
            <th>{{$t('cartRemove')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in cart" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.location }}</td>
            <td>
              <button @click="decrement(idx)" :disabled="item.quantity <= 1">-</button>
              <span class="cart-qty">{{ item.quantity }}</span>
              <button @click="increment(idx)">+</button>
            </td>
            <td>
              <button @click="remove(idx)">{{$t('cartRemove')}}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      cart: [] // This should be loaded from a store or backend in a real app
    }
  },
  mounted() {
    // For demo: load from localStorage or mock data
    const saved = localStorage.getItem('cart');
    this.cart = saved ? JSON.parse(saved) : [];
  },
  methods: {
    increment(idx) {
      this.cart[idx].quantity++;
      this.saveCart();
    },
    decrement(idx) {
      if (this.cart[idx].quantity > 1) {
        this.cart[idx].quantity--;
        this.saveCart();
      }
    },
    remove(idx) {
      this.cart.splice(idx, 1);
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
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
</style>
