<template>
  <div>
      <div class="session">
        <h2>This is session index page</h2>
      </div>
      <div>
        <h2><router-link to="/login">Login</router-link></h2>
        <h2><router-link to="/signup">Sing-up</router-link></h2>
      </div>
    <router-view/>
  </div>
</template>

<script>
</script>

<style scoped>

a {
  color: #42b983;
}
</style>