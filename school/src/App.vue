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
        <li style="position: relative;">
          <a href="#" class="loginiconlink" aria-label="Login" @click.prevent="toggleDropdown">
            <img src="https://cdn-icons-png.flaticon.com/512/681/681494.png" alt="Login" width="36" height="36" style="filter: brightness(0) invert(1);" />
          </a>
          <div v-if="showDropdown" class="login-dropdown">
            <router-link to="/login" class="dropdown-item">Login</router-link>
            <router-link to="/admin" class="dropdown-item">Admin Panel</router-link>
          </div>
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
  data() {
    return {
      showDropdown: false
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    setLang(lang) {
      this.$i18n.locale = lang;
    },
    toggleDropdown(event) {
      this.showDropdown = !this.showDropdown;
      if (event) event.stopPropagation();
    },
    handleClickOutside(event) {
      if (this.showDropdown) {
      const dropdown = this.$el.querySelector('.login-dropdown');
      const icon = this.$el.querySelector('.loginiconlink');
      if (dropdown && !dropdown.contains(event.target) && icon && !icon.contains(event.target)) {
      this.showDropdown = false;
        }
      }
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
.login-dropdown {
  position: absolute;
  top: 48px;
  right: 0;
  background: #181a20;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  min-width: 180px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  border: 1.5px solid #e0e7ff;
  animation: dropdown-fade-in 0.18s cubic-bezier(.4,0,.2,1);
  overflow: hidden;
}
@keyframes dropdown-fade-in {
  from { opacity: 0; transform: translateY(-12px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.dropdown-item {
  color: #fff;
  padding: 14px 32px 14px 24px;
  text-decoration: none;
  font-size: 1.08rem;
  font-weight: 500;
  transition: background 0.18s, color 0.18s, padding-left 0.18s;
  cursor: pointer;
  border: none;
  background: none;
  text-align: left;
  border-left: 3px solid transparent;
  letter-spacing: 0.01em;
}
.dropdown-item:hover {
  background: #23272f;
  color: #ff9800;
  border-left: 3px solid #ffb300;
  padding-left: 30px;
}
</style>
