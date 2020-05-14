import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueAxios from '@/plugins/axios'
// import axios from "vue-axios";

// export adefault axios.create({
//   baseURL: "http://localhost:3000"
// })

Vue.config.productionTip = false

// Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
