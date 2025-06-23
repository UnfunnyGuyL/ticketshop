<template>
  <div class="aboutpage">
    <h1>{{ $t('aboutTitle') }}</h1>
    <p>{{ $t('aboutText') }}</p>
    <p>{{ $t('aboutLong') }}</p>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.aboutpage {
  max-width: 800px;
  margin: 60px auto;
  background: linear-gradient(135deg, #f9f9f9 0%, #ffe0b2 100%);
  color: #ff9800;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(255,152,0,0.10);
  padding: 40px 30px;
  border: 3px solid #ffb300;
  text-align: center;
}
.aboutpage h1 {
  margin-bottom: 18px;
  font-size: 2.2rem;
  font-weight: bold;
  color: #ff9800;
}
.aboutpage p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #ff9800;
  margin-bottom: 18px;
}
</style>
