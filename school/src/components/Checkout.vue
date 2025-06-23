<template>
  <div class="checkout-container">
    <h1>{{ $t('orderPlacedTitle') }}</h1>
    <p>{{ $t('orderPlacedMessage') }}</p>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
}
</script>

<style scoped>
.checkout-container {
  max-width: 600px;
  margin: 80px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(44,62,80,0.10);
  padding: 48px 36px 40px 36px;
  border: 1.5px solid #e0e7ff;
  text-align: center;
}
.checkout-container h1 {
  color: #203a43;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 18px;
}
.checkout-container p {
  color: #23272f;
  font-size: 1.2rem;
}
</style>
