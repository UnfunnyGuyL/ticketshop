<template>
  <div id="app">
    <nav class="navbar">
      <div class="logo">🎟 TicketWave</div>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About Us</router-link></li>
        <li><a href="#events">{{$t('title')}}</a></li>
        <li><a href="#">{{$t('login')}}</a></li>
        <li><a href="#" @click.prevent="setLang('en')">EN</a></li>
        <li><a href="#" @click.prevent="setLang('nl')">NL</a></li>
      </ul>
    </nav>

    <router-view />

    <footer class="footer">
      <p>&copy; 2025 TicketWave. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    setLang(lang) {
      this.$i18n.locale = lang;
    }
  }
}
</script>

<style scoped>
:global(html, body, #app) {
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
  background: #222;
  box-sizing: border-box;
  overflow-x: hidden;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222;
  padding: 15px 30px;
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-links a:hover {
  text-decoration: underline;
}

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


.footer {
  margin-top: 40px;
  background: #111;
  color: #ccc;
  text-align: center;
  padding: 20px 0;
  font-size: 0.9rem;
}
</style>
