<template>
  <v-app id="inspire">
    <headerItem/>
    <router-view></router-view>
    <footerItem/>
  </v-app>
</template>

<script>
import headerItem from './components/header'
import footerItem from './components/footer'

  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    components: {
      headerItem,
      footerItem,
    }
  }
</script>