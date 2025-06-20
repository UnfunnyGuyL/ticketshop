<template>
  <div class="tospage">
    <div class="tosimage">
      <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="TOS Icon" />
    </div>
    <div class="toscontent">
      <h1>{{$t('tosTitle')}}</h1>
      <p>{{$t('tosIntro')}}</p>
      <ul>
        <li v-for="(item, idx) in tosList" :key="idx">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tos',
  computed: {
    tosList() {
      return this.$i18n.messages[this.$i18n.locale].tosList || [];
    }
  }
}
</script>

<style scoped>
.tospage {
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
}
.tosimage {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tosimage img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(26,35,126,0.08);
  border: 3px solid #e0e7ff;
}
.toscontent {
  text-align: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(26,35,126,0.08);
  padding: 32px 24px;
  max-width: 600px;
  margin-top: 12px;
}
.toscontent h1 {
  margin-bottom: 18px;
  font-size: 2.2rem;
  font-weight: bold;
  color: #3949ab;
}
.toscontent p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
  margin-bottom: 18px;
}
.toscontent ul {
  list-style: disc inside;
  text-align: left;
  margin: 0 auto;
  max-width: 400px;
  color: #283593;
  font-size: 1rem;
  padding-left: 0;
}
.toscontent li {
  margin-bottom: 10px;
}
</style>
