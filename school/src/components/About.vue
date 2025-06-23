<template>
  <div class="aboutpage">
    <div class="aboutimage">
      <img :src="aboutImg" alt="About Us" />
    </div>
    <div class="aboutcontent">
      <h1>{{$t('aboutTitle')}}</h1>
      <p>{{$t('aboutText')}}</p>
    </div>
  </div>
</template>

<script>
import aboutImg from '../assets/IMG_0453.jpg';
export default {
  name: 'About',
  data() {
    return { aboutImg };
  }
}
</script>

<style scoped>
.aboutpage {
  max-width: 800px;
  margin: 60px auto;
  background: linear-gradient(120deg, #f9fbe7 0%, #b2dfdb 100%);
  color: #222;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  border: 3px solid #26a69a;
}
.aboutimage {
  display: flex;
  justify-content: center;
  align-items: center;
}
.aboutimage img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border: 4px solid #b2dfdb;
  background: #e0f2f1;
}
.aboutcontent {
  text-align: center;
  background: #e0f2f1;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(38,166,154,0.08);
  padding: 32px 24px;
  max-width: 600px;
  margin-top: 12px;
  border: 2px solid #4dd0e1;
}
.aboutcontent h1 {
  margin-bottom: 18px;
  font-size: 2.2rem;
  font-weight: bold;
  color: #00897b;
}
.aboutcontent p {
  font-size: 1.15rem;
  line-height: 1.7;
  color: #37474f;
}
</style>
