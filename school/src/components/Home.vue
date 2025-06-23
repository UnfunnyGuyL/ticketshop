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
          <div class="event-btn-row">
            <button class="buyticket">{{$t('buyticket')}}</button>
            <button class="learnmore">{{$t('learnmore') || 'Learn More'}}</button>
          </div>
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


.event-btn-row {
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 10px;
  justify-content: flex-start;
}
.buyticket, .learnmore {
  min-width: 120px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(44,62,80,0.06);
  padding: 10px 18px;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  transition: background 0.18s;
  display: inline-block;
}
.buyticket {
  background: #4caf50;
  color: #fff;
}
.buyticket:hover {
  background: #388e3c;
}
.learnmore {
  background: #ff9800;
  color: #fff;
}
.learnmore:hover {
  background: #e65100;
}
</style>
