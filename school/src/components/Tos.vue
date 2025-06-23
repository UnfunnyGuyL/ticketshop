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
      <p>{{$t('tosLong')}}</p>
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
  background: linear-gradient(135deg, #ede7f6 0%, #bbdefb 100%);
  color: #4527a0;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(69,39,160,0.10);
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  border: 3px solid #7e57c2;
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
  background: #ede7f6;
  box-shadow: 0 2px 12px rgba(26,35,126,0.08);
  border: 3px solid #bbdefb;
}
.toscontent {
  text-align: center;
  background: #ede7f6;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(126,87,194,0.08);
  padding: 32px 24px;
  max-width: 600px;
  margin-top: 12px;
  border: 2px solid #9575cd;
}
.toscontent h1 {
  margin-bottom: 18px;
  font-size: 2.2rem;
  font-weight: bold;
  color: #5e35b1;
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
  color: #5e35b1;
  font-size: 1rem;
  padding-left: 0;
}
.toscontent li {
  margin-bottom: 10px;
}
.tos-container {
  background: #fff;
  color: #23272f;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(44,62,80,0.10);
  padding: 36px 32px 32px 32px;
  margin: 40px auto 32px auto;
  max-width: 700px;
  text-align: left;
  border: 1.5px solid #e0e7ff;
}
.tos-container h1 {
  color: #203a43;
  font-size: 2.1rem;
  font-weight: 800;
  margin-bottom: 18px;
  letter-spacing: 0.01em;
}
.tos-container h2 {
  color: #0f2027;
  font-size: 1.3rem;
  margin-top: 28px;
  margin-bottom: 10px;
}
.tos-container ul, .tos-container ol {
  margin-left: 1.5em;
  margin-bottom: 1em;
}
.tos-container p {
  margin-bottom: 1em;
  color: #23272f;
}
@media (max-width: 800px) {
  .tos-container {
    padding: 18px 8px 18px 8px;
    max-width: 98vw;
  }
}
</style>
