<template>
  <v-app id="inspire">
    <toolbar/>
    <v-container >
      <div :class="$style.content">
        <router-view></router-view>
      </div>
      
    </v-container>
    <footerItem/>
  </v-app>
</template>

<script>
// import headerItem from './components/header'
import footerItem from './components/footer'
import toolbar from './components/toolbar'

  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    components: {
      // headerItem,
      toolbar,
      footerItem,
    }
  }
</script>

<style module>
.content{
  padding-left: 60px;
}
</style>