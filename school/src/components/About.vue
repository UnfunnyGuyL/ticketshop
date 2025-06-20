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
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  color: #222;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
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
  border: 4px solid #f9f9f9;
  background: #eee;
}
.aboutcontent {
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 32px 24px;
  max-width: 600px;
  margin-top: 12px;
}
.aboutcontent h1 {
  margin-bottom: 18px;
  font-size: 2.2rem;
  font-weight: bold;
  color: #203a43;
}
.aboutcontent p {
  font-size: 1.15rem;
  line-height: 1.7;
  color: #333;
}
</style>
