<template>
  <div>
    <div v-if="showPopup" class="cart-popup">{{ popupMessage }}</div>
    <header class="hero">
      <div class="herocontent">
        <h1>{{$t('welcome')}}</h1>
        <p>{{$t('subtitle')}}</p>
        <button @click="scrollToEvents">{{$t('browse')}}</button>
      </div>
    </header>
    <section class="events" id="events">
      <h2>{{$t('title')}}</h2>
      <div class="catalog-list">
        <div class="catalog-card" v-for="event in displayedEvents" :key="event.id">
          <h2>{{ $t('eventNames.' + event.title) || event.title }}</h2>
          <p><strong>{{$t('date')}}:</strong> {{ event.date.split('T')[0] }}</p>
          <div class="catalog-btn-row">
            <button class="catalog-btn" @click="openModal(event)">{{$t('learnmore')}}</button>
            <button class="catalog-btn" @click="addToCart(event)">{{$t('buyticket')}}</button>
          </div>
        </div>
      </div>
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <h2>{{ $t('eventNames.' + selectedEvent.title) || selectedEvent.title }}</h2>
          <p><strong>{{$t('date')}}:</strong> {{ selectedEvent.date.split('T')[0] }}</p>
          <p v-if="selectedEvent.location"><strong>{{$t('location')}}:</strong> {{ selectedEvent.location }}</p>
          <p v-if="selectedEvent.price"><strong>{{$t('price') || 'Price'}}:</strong> {{ formatPrice(selectedEvent.price) }}</p>
          <p v-if="selectedEvent.description">{{ selectedEvent.description }}</p>
          <div class="catalog-btn-row">
            <button class="catalog-btn" @click="addToCart(selectedEvent)">{{$t('buyticket')}}</button>
            <button class="catalog-btn" style="background:#bbb; margin-left:10px;" @click="closeModal">{{$t('close') || 'Close'}}</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      events: [],
      showModal: false,
      selectedEvent: {},
      showPopup: false,
      popupMessage: ''
    };
  },
  computed: {
    displayedEvents() {
      return this.events.slice(0, 3);
    }
  },
  async mounted() {
    const res = await axios.get('http://localhost:3000/api/events');
    // Set prices for specific events to match Catalog.vue
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
  methods: {
    scrollToEvents() {
      const el = document.getElementById('events');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    openModal(event) {
      this.selectedEvent = event;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedEvent = {};
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
    formatPrice(price) {
      return '€' + Number(price).toFixed(2);
    }
  }
}
</script>

<style scoped>
.hero {
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 20px;
}
.herocontent h1 {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: #fff;
  text-shadow: 0 4px 24px rgba(44,62,80,0.18), 0 1px 0 #203a43;
  margin-bottom: 18px;
}
.herocontent p {
  font-size: 1.3rem;
  color: #e0e7ff;
  margin-bottom: 18px;
  text-shadow: 0 2px 8px rgba(44,62,80,0.10);
}
.hero-content {
  max-width: 600px;
}
.hero button {
  margin-top: 20px;
  padding: 12px 24px;
  background: #ff4b2b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
.events {
  padding: 40px 20px;
  background-color: #f9f9f9;
  text-align: center;
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
.catalog-btn-row {
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-top: 10px;
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
