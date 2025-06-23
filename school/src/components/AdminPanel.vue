<template>
  <div class="admin-panel-container">
    <h1>{{ $t('adminPanelTitle') }}</h1>
    <p>{{ $t('adminWelcome') }}</p>
    <h2 style="margin-top:32px;">{{ $t('orders') }}</h2>
    <table class="admin-orders-table">
      <thead>
        <tr>
          <th>{{ $t('user') }}</th>
          <th>{{ $t('date') }}</th>
          <th>{{ $t('items') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.username }}</td>
          <td>{{ formatDate(order.date) }}</td>
          <td>
            <ul>
              <li v-for="item in order.items" :key="item.title">
                {{ $t('eventNames.' + item.title) || item.title }} x{{ item.quantity }}
              </li>
            </ul>
          </td>
        </tr>
        <tr v-if="orders.length === 0">
          <td colspan="3">{{ $t('noOrders') }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="error" class="admin-error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AdminPanel',
  data() {
    return {
      orders: [],
      error: ''
    }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return ''
      // Remove seconds and milliseconds: '2025-06-23T14:23:45.000Z' -> '2025-06-23 14:23'
      const [date, time] = dateStr.split('T')
      if (!time) return date
      const [hh, mm] = time.split(':')
      return `${date} ${hh}:${mm}`
    }
  },
  async mounted() {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        this.error = this.$t('noAdminToken');
        console.error('No admin token found in localStorage.');
        return;
      }
      const res = await axios.get('http://localhost:3000/api/orders', {
        headers: { Authorization: 'Bearer ' + token }
      });
      // Parse items JSON for each order
      this.orders = res.data.map(order => ({
        ...order,
        items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items
      }));
    } catch (e) {
      this.error = this.$t('fetchOrdersError') + (e.response?.data?.message ? ': ' + e.response.data.message : '');
      console.error('Failed to fetch orders:', e, 'Token:', localStorage.getItem('adminToken'));
    }
  }
}
</script>

<style scoped>
.admin-panel-container {
  max-width: 800px;
  margin: 80px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(44,62,80,0.10);
  padding: 48px 36px 40px 36px;
  border: 1.5px solid #e0e7ff;
  text-align: center;
}
.admin-panel-container h1 {
  color: #203a43;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 18px;
}
.admin-panel-container h2 {
  color: #0f2027;
  font-size: 1.3rem;
  margin-top: 28px;
  margin-bottom: 10px;
}
.admin-orders-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 18px;
}
.admin-orders-table th, .admin-orders-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #e0e7ff;
  text-align: left;
}
.admin-orders-table th {
  background: #f9f9f9;
  color: #203a43;
}
.admin-orders-table tr:nth-child(even) {
  background: #f5f7fa;
}
.admin-error {
  color: #e63946;
  margin-top: 20px;
  font-weight: 500;
}
</style>
