<template>
  <div class="catalog-container">
    <div v-if="showPopup" class="cart-popup">{{ popupMessage }}</div>
    <h1>{{$t('catalogTitle') || $t('title')}}</h1>
    <div class="catalog-controls">
      <input v-model="search" class="catalog-search" :placeholder="$t('searchEvents') || 'Search events...'" />
      <select v-model="sortOrder" class="catalog-sort">
        <option value="A-Z">A to Z</option>
        <option value="Z-A">Z to A</option>
      </select>
    </div>
    <div class="catalog-list">
      <div class="catalog-card" v-for="event in filteredEvents" :key="event.id">
        <h2>{{ $t('eventNames.' + event.title) || event.title }}</h2>
        <p><strong>{{$t('date')}}:</strong> {{ event.date.split('T')[0] }}</p>
        <button class="catalog-btn" @click="openModal(event)">{{$t('learnmore')}}</button>
        <button class="catalog-btn" @click="addToCart(event)">{{$t('buyticket')}}</button>
      </div>
    </div>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ $t('eventNames.' + selectedEvent.title) || selectedEvent.title }}</h2>
        <p><strong>{{$t('date')}}:</strong> {{ selectedEvent.date.split('T')[0] }}</p>
        <p><strong>{{$t('location')}}:</strong> {{ selectedEvent.location }}</p>
        <p><strong>{{$t('price')}}:</strong> {{ formatPrice(selectedEvent.price) }}</p>
        <p>{{ selectedEvent.description }}</p>
        <button class="catalog-btn" @click="addToCart(selectedEvent); closeModal()">{{$t('buyticket')}}</button>
        <button class="catalog-btn" style="background:#bbb; margin-left:10px;" @click="closeModal">{{$t('close')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Catalog',
  data() {
    return {
      search: '',
      sortOrder: 'A-Z',
      events: [],
      showModal: false,
      selectedEvent: {},
      showPopup: false,
      popupMessage: ''
    }
  },
  async mounted() {
    const res = await axios.get('http://localhost:3000/api/events');
    // Set prices for specific events
    const priceMap = {
      'Comedy Gala': 199,
      'Food Expo': 50,
      'Jazz Festival': 36,
      'Rock Night': 55,
      'Tech Conference': 65,
      'Winter Wonderland': 25
    };
    this.events = res.data.map(e => ({
      ...e,
      price: priceMap[e.title] !== undefined ? priceMap[e.title] : ((typeof e.price === 'number' && !isNaN(e.price)) ? e.price : (Math.floor(Math.random() * 91) + 10))
    }));
  },
  computed: {
    filteredEvents() {
      let filtered = this.events.filter(e =>
        e.title.toLowerCase().includes(this.search.toLowerCase()) ||
        e.location.toLowerCase().includes(this.search.toLowerCase()) ||
        e.description.toLowerCase().includes(this.search.toLowerCase())
      );
      filtered.sort((a, b) => {
        if (this.sortOrder === 'A-Z') {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
      return filtered;
    }
  },
  methods: {
    formatPrice(price) {
      return '€' + Number(price).toFixed(2);
    },
    showCartPopup(message) {
      this.popupMessage = message;
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false;
      }, 2000);
    },
    async addToCart(event) {
      const token = localStorage.getItem('token');
      if (!token) {
        this.showCartPopup('You are not logged in!');
        return;
      }
     
      const quantity = 1;
     
      let cart = [];
      try {
        const res = await axios.get('http://localhost:3000/api/cart', {
          headers: { Authorization: 'Bearer ' + token }
        });
        cart = Array.isArray(res.data.cart) ? res.data.cart : [];
      } catch (e) {
        cart = [];
      }
      // Ensure event.id is a number for comparison
      const eventId = Number(event.id);
      const idx = cart.findIndex(item => Number(item.id) === eventId);
      if (idx !== -1) {
        cart[idx].quantity += quantity;
      } else {
        cart.push({ ...event, id: eventId, quantity });
      }
      
      try {
        await axios.post('http://localhost:3000/api/cart', { cart }, {
          headers: { Authorization: 'Bearer ' + token }
        });
        this.showCartPopup('Added to cart!');
      } catch (e) {
        this.showCartPopup('Failed to save cart.');
      }
    },
    openModal(event) {
      this.selectedEvent = event;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedEvent = {};
    }
  }
}
</script>

<style scoped>
.catalog-container {
  max-width: 1000px;
  margin: 40px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(44,62,80,0.10);
  padding: 36px 32px 32px 32px;
  border: 1.5px solid #e0e7ff;
}
.catalog-container h1 {
  color: #203a43;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 24px;
}
.catalog-controls {
  display: flex;
  gap: 18px;
  margin-bottom: 24px;
  align-items: center;
}
.catalog-search {
  flex: 1;
  padding: 10px 14px;
  border-radius: 6px;
  border: 1.5px solid #e0e7ff;
  font-size: 1rem;
}
.catalog-sort {
  padding: 10px 14px;
  border-radius: 6px;
  border: 1.5px solid #e0e7ff;
  font-size: 1rem;
}
.catalog-list {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
}
.catalog-card {
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(44,62,80,0.08);
  padding: 24px 20px;
  width: 280px;
  border: 1.5px solid #e0e7ff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.catalog-card h2 {
  margin-bottom: 10px;
  color: #0f2027;
  font-size: 1.3rem;
}
.catalog-card p {
  margin-bottom: 8px;
  color: #23272f;
}
.catalog-btn {
  margin-top: 10px;
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.18s;
  display: inline-block;
}
.catalog-btn:hover {
  background: #e65100;
}
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  border-radius: 12px;
  padding: 32px 28px;
  min-width: 320px;
  max-width: 90vw;
  box-shadow: 0 4px 24px rgba(44,62,80,0.18);
  border: 1.5px solid #e0e7ff;
  text-align: left;
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
</style>
