<template>
  <div id="app">
    <nav class="navbar">
      <div class="logo">🎟 TicketWave</div>
      <ul class="navlinks">
        <li><router-link to="/">Home</router-link></li>
        <li><a href="#events">{{$t('title')}}</a></li>
        <li><a href="#">{{$t('login')}}</a></li>
      </ul>
    </nav>

    <router-view />

    <footer class="footer">
      <div class="footerrow">
        <div class="footerleft">
          <router-link to="/about" class="footer-link">About Us</router-link>
          <router-link to="/tos" class="footer-link" style="margin-left: 18px;">TOS</router-link>
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
