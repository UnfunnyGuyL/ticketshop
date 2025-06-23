<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="logo" aria-label="Home">
        🎟 TicketWave
      </router-link>
      <ul class="navlinks">
        <li>
          <a href="#events" class="shopiconlink" aria-label="Shop">
            <img src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png" alt="Shop" width="36" height="36" style="filter: brightness(0) invert(1);" />
          </a>
        </li>
        <li>
          <a href="#cart" class="carticonlink" aria-label="Cart">
            <img src="https://cdn-icons-png.flaticon.com/512/34/34627.png" alt="Cart" width="36" height="36" style="filter: brightness(0) invert(1);" />
          </a>
        </li>
        <li>
          <a href="#" class="loginiconlink" aria-label="Login">
            <img src="https://cdn-icons-png.flaticon.com/512/681/681494.png" alt="Login" width="36" height="36" style="filter: brightness(0) invert(1);" />
          </a>
        </li>
      </ul>
    </nav>

    <router-view />

    <footer class="footer">
      <div class="footerrow">
        <div class="footerleft">
          <router-link to="/about" class="footer-link">About Us</router-link>
          <router-link to="/tos" class="footer-link" style="margin-left: 18px;">TOS</router-link>
          <router-link to="/privacy" class="footer-link" style="margin-left: 18px;">Privacy Policy</router-link>
        </div>
        <div class="footerright">
          <div class="langswitch">
            <button @click.prevent="setLang('en')" :class="{ active: $i18n.locale === 'en' }">EN</button>
            <button @click.prevent="setLang('nl')" :class="{ active: $i18n.locale === 'nl' }">NL</button>
          </div>
        </div>
      </div>
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

<style src="./app.css"></style>

<style>
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
}
.logo:hover {
  opacity: 0.7;
}
.shopiconlink, .loginiconlink, .carticonlink {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 10px;
  transition: background 0.2s;
}
.navlinks {
  display: flex;
  gap: 24px;
}
.shop-icon-link:hover, .login-icon-link:hover, .cart-icon-link:hover {
  background: rgba(255,255,255,0.08);
  border-radius: 6px;
}
</style>
