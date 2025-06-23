<template>
  <div class="admin-panel-container">
    <div v-if="showPopup" class="cart-popup">{{ popupMessage }}</div>
    <div class="admin-flex-row">
      <div class="admin-orders-section">
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
                    {{ item.title }} x{{ item.quantity }}
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
      <div class="admin-crud-section">
        <h2 style="margin-bottom:18px;">{{$t('eventCrud')}}</h2>
        <table class="admin-crud-table">
          <thead>
            <tr>
              <th>{{$t('title')}}</th>
              <th>{{$t('date')}}</th>
              <th>{{$t('location')}}</th>
              <th>{{$t('price')}}</th>
              <th>{{$t('description')}}</th>
              <th>{{$t('actions')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(event, idx) in events" :key="event.id">
              <td><input v-model="event.title" :placeholder="$t('title')" /></td>
              <td><input v-model="event.date" type="date" :placeholder="$t('date')" /></td>
              <td><input v-model="event.location" :placeholder="$t('location')" /></td>
              <td><input v-model.number="event.price" type="number" min="0" :placeholder="$t('price')" /></td>
              <td><input v-model="event.description" :placeholder="$t('description')" /></td>
              <td>
                <button @click="updateEvent(event)">{{$t('save')}}</button>
                <button @click="deleteEvent(event.id)" style="margin-left:8px; color:#e63946;">{{$t('delete')}}</button>
              </td>
            </tr>
            <tr>
              <td><input v-model="newEvent.title" :placeholder="$t('title')" /></td>
              <td><input v-model="newEvent.date" type="date" :placeholder="$t('date')" /></td>
              <td><input v-model="newEvent.location" :placeholder="$t('location')" /></td>
              <td><input v-model.number="newEvent.price" type="number" min="0" :placeholder="$t('price')" /></td>
              <td><input v-model="newEvent.description" :placeholder="$t('description')" /></td>
              <td><button @click="addEvent">{{$t('add')}}</button></td>
            </tr>
          </tbody>
        </table>
        <div v-if="crudError" class="admin-error">{{ crudError }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AdminPanel',
  data() {
    return {
      orders: [],
      error: '',
      events: [],
      crudError: '',
      newEvent: { title: '', date: '', location: '', price: 0, description: '' },
      showPopup: false,
      popupMessage: ''
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
    },
    async fetchEvents() {
      try {
        const res = await axios.get('http://localhost:3000/api/events');
        this.events = res.data;
      } catch (e) {
        this.crudError = 'Failed to fetch events.';
      }
    },
    showCrudPopup(messageKey) {
      // Use global Home.vue popup if available
      if (this.$root && this.$root.showCrudPopup) {
        this.$root.showCrudPopup(messageKey);
      } else {
        this.popupMessage = typeof this.$t === 'function' ? this.$t(messageKey) : messageKey;
        this.showPopup = true;
        setTimeout(() => {
          this.showPopup = false;
        }, 2000);
      }
    },
    async updateEvent(event) {
      // Ensure price is a number and not empty
      if (event.price === '' || event.price === null || isNaN(Number(event.price))) {
        this.crudError = this.$t('priceMustBeNumber');
        return;
      }
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          this.crudError = this.$t('noAdminToken');
          return;
        }
        // Debug: Log the request being sent
        console.log('PUT /api/events/' + event.id, { ...event, price: Number(event.price), description: event.description || '' });
        const payload = { ...event, price: Number(event.price), description: event.description || '' };
        await axios.put(`http://localhost:3000/api/events/${event.id}`, payload, {
          headers: { Authorization: 'Bearer ' + token }
        });
        this.crudError = '';
        this.fetchEvents();
        this.showCrudPopup('eventUpdated');
      } catch (e) {
        this.crudError = this.$t('failedToUpdateEvent');
        if (e.response && e.response.data && e.response.data.message) {
          this.crudError += ' ' + e.response.data.message;
        }
        // Log error and full response for debugging
        console.error('Update event error:', e, e?.response);
      }
    },
    async deleteEvent(id) {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          this.crudError = this.$t('noAdminToken');
          return;
        }
        await axios.delete(`http://localhost:3000/api/events/${id}`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        this.crudError = '';
        this.fetchEvents();
        this.showCrudPopup('eventDeleted');
      } catch (e) {
        this.crudError = 'Failed to delete event.';
      }
    },
    async addEvent() {
      if (!this.newEvent.title || !this.newEvent.date || !this.newEvent.location) {
        this.crudError = this.$t('fillAllFields') || 'Fill in all fields.';
        return;
      }
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          this.crudError = this.$t('noAdminToken');
          return;
        }
        await axios.post('http://localhost:3000/api/events', this.newEvent, {
          headers: { Authorization: 'Bearer ' + token }
        });
        this.crudError = '';
        this.newEvent = { title: '', date: '', location: '', price: 0, description: '' };
        this.fetchEvents();
        this.showCrudPopup('eventAdded');
      } catch (e) {
        this.crudError = this.$t('failedToAddEvent') || 'Failed to add event.';
      }
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
    this.fetchEvents();
  }
}
</script>

<style scoped>
.admin-panel-container {
  max-width: 1400px;
  margin: 80px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(44,62,80,0.10);
  padding: 64px 64px 48px 64px;
  border: 1.5px solid #e0e7ff;
  text-align: center;
}
.admin-flex-row {
  display: flex;
  gap: 64px;
  align-items: flex-start;
  flex-wrap: wrap;
}
.admin-orders-section {
  flex: 2 1 400px;
  min-width: 380px;
}
.admin-crud-section {
  flex: 4 1 700px;
  background: #f9f9f9;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(44,62,80,0.10);
  padding: 48px 36px 40px 36px;
  border: 1.5px solid #e0e7ff;
  margin-top: 24px;
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
.admin-crud-section h2 {
  color: #203a43;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 18px;
}
.admin-crud-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  margin-top: 8px;
}
.admin-crud-table th, .admin-crud-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #e0e7ff;
  text-align: left;
  vertical-align: middle;
}
.admin-crud-table th {
  background: #f1f1f1;
  color: #203a43;
  font-size: 1.05rem;
  font-weight: 700;
}
.admin-crud-table tr {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(44,62,80,0.04);
}
.admin-crud-table tr:nth-child(even) {
  background: #f5f7fa;
}
.admin-crud-table input {
  width: 100%;
  padding: 7px 8px;
  border-radius: 6px;
  border: 1.5px solid #e0e7ff;
  font-size: 1rem;
  background: #f9f9f9;
  margin: 0;
  box-sizing: border-box;
}
.admin-crud-table input:focus {
  outline: 2px solid #ff9800;
  background: #fffde7;
}
.admin-crud-table button {
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 7px 16px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.18s;
  margin-bottom: 2px;
}
.admin-crud-table button:hover {
  background: #e65100;
}
.admin-crud-table td:last-child {
  white-space: nowrap;
}
.admin-error {
  color: #e63946;
  margin-top: 20px;
  font-weight: 500;
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
@media (max-width: 1100px) {
  .admin-flex-row {
    flex-direction: column;
    gap: 32px;
  }
  .admin-crud-section, .admin-orders-section {
    min-width: 0;
    width: 100%;
  }
}
</style>
