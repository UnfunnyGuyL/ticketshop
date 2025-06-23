```vue
<template>
  <div class="privacypage">
    <div class="privacyimage">
      <img src="https://cdn-icons-png.flaticon.com/512/942/942748.png" alt="Privacy Icon" />
    </div>
    <div class="privacycontent">
      <h1>{{ $t('privacyTitle') }}</h1>
      <p>{{ $t('privacyIntro') }}</p>
      <ul>
        <li v-for="(item, idx) in privacyList" :key="idx">{{ item }}</li>
      </ul>
      <p>{{ $t('privacyLong') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  computed: {
    privacyList() {
      
      return this.$i18n.messages[this.$i18n.locale].privacyList || [];
    }
  }
}
</script>

<style scoped>
.privacypage {
  max-width: 800px;
  margin: 60px auto;
  background: linear-gradient(135deg, #f9f9f9 0%, #e0e7ff 100%);
  color: #1a237e;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(26,35,126,0.10);
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  border: 3px solid #ffb300;
}
.privacyimage {
  display: flex;
  justify-content: center;
  align-items: center;
}
.privacyimage img {
  width: 110px;
  height: 110px;
  object-fit: contain;
  border-radius: 20px;
  background: #fffbe7;
  box-shadow: 0 2px 12px rgba(26,35,126,0.08);
  border: 3px solid #ffb300;
}
.privacycontent {
  text-align: center;
  background: #fffbe7;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(255,193,7,0.08);
  padding: 32px 24px;
  max-width: 600px;
  margin-top: 12px;
  border: 2px solid #ffd54f;
}
.privacycontent h1 {
  margin-bottom: 18px;
  font-size: 2.2rem;
  font-weight: bold;
  color: #ff9800;
}
.privacycontent p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
  margin-bottom: 18px;
}
.privacycontent ul {
  list-style: disc inside;
  text-align: left;
  margin: 0 auto 18px auto;
  max-width: 100%;
  color: #ff9800;
  font-size: 1rem;
  padding-left: 0;
  word-break: break-word;
  overflow-wrap: anywhere;
}
.privacycontent li {
  margin-bottom: 10px;
}
</style>
```