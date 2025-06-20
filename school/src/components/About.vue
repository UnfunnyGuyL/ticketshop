<template>
  <div class="about-page">
    <div class="about-image">
      <img :src="aboutImg" alt="About Us" />
    </div>
    <div class="about-content">
      <h1>About Us</h1>
      <p>TicketWave is your trusted platform for discovering and buying tickets to the best events in the Netherlands. We are passionate about connecting people with unforgettable experiences.</p>
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
.about-page {
  max-width: 800px;
  margin: 60px auto;
  /* Add background gradient similar to home hero */
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
.about-image {
  display: flex;
  justify-content: center;
  align-items: center;
}
.about-image img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border: 4px solid #f9f9f9;
  background: #eee;
}
.about-content {
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 32px 24px;
  max-width: 600px;
  margin-top: 12px;
}
.about-content h1 {
  margin-bottom: 18px;
  font-size: 2.2rem;
  font-weight: bold;
  color: #203a43;
}
.about-content p {
  font-size: 1.15rem;
  line-height: 1.7;
  color: #333;
}
</style>
