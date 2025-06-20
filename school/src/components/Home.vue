<template>
  <div>
    <header class="hero">
      <div class="herocontent">
        <h1>{{$t('welcome')}}</h1>
        <p>{{$t('subtitle')}}</p>
        <button @click="scrollToEvents">{{$t('browse')}}</button>
      </div>
    </header>
    <section class="events" id="events">
      <h2>{{$t('title')}}</h2>
      <div class="eventlist">
        <div
          class="eventcard"
          v-for="event in events"
          :key="event.id"
        >
          <h3>{{ event.title }}</h3>
          <p><strong>{{$t('date')}}:</strong> {{ event.date }}</p>
          <p><strong>{{$t('location')}}:</strong> {{ event.location }}</p>
          <button>{{$t('buy')}}</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      events: [
        { id: 1, title: 'Rock Night', date: '2025-07-01', location: 'Amsterdam' },
        { id: 2, title: 'Tech Conference', date: '2025-08-15', location: 'Rotterdam' },
        { id: 3, title: 'Comedy Gala', date: '2025-09-10', location: 'Utrecht' }
      ]
    };
  },
  methods: {
    scrollToEvents() {
      const el = document.getElementById('events');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
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
.event-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}
.event-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.event-card h3 {
  margin-bottom: 10px;
}
.event-card button {
  margin-top: 10px;
  padding: 10px 15px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.event-card button:hover {
  background: #45a049;
}
</style>
