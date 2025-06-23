<template>
  <div class="admin-panel-container">
    <h1>Admin Panel</h1>
    <p>Welcome, admin! This is your admin dashboard.</p>
  </div>
</template>

<script>
export default {
  name: 'AdminPanel',
}
</script>

<style scoped>
.admin-panel-container {
  max-width: 600px;
  margin: 80px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(44,62,80,0.10);
  padding: 48px 36px 40px 36px;
  border: 1.5px solid #e0e7ff;
  text-align: center;
}
.admin-panel-container h1 {
  color: #203a43;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 18px;
}
.admin-panel-container p {
  color: #23272f;
  font-size: 1.2rem;
}
</style>
