```vue
<template>
  <div class="privacypage">
    <div class="privacyimage">
      <img src="https://cdn-icons-png.flaticon.com/512/942/942748.png" alt="Privacy Icon" />
    </div>
    <div class="privacycontent">
      <h1>Privacy Policy</h1>
      <p>
        Your privacy is important to us. This page explains how TicketWave collects, uses, and protects your personal information when you use our platform.
      </p>
      <ul>
        <li>We only collect information necessary for ticket purchases and account management.</li>
        <li>Your data is never sold or shared with third parties for marketing purposes.</li>
        <li>All payment transactions are processed securely using industry-standard encryption.</li>
        <li>You can request to view, update, or delete your personal data at any time by contacting our support team.</li>
        <li>We use cookies to enhance your experience and for essential site functionality.</li>
        <li>Our privacy practices comply with applicable laws and regulations.</li>
      </ul>
      <p>
        If you have questions about our privacy policy, please contact us at privacy@ticketwave.com.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy'
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
  max-width: 480px;
  color: #ff9800;
  font-size: 1rem;
  padding-left: 0;
}
.privacycontent li {
  margin-bottom: 10px;
}
</style>
```