import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from 'vue2-google-maps'

console.clear()

// gooogle mapを使う設定
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAZF4-iW_dV8rvIW2pg3vcqTUU99XHarYE',
    libraries: 'places',
    region: 'JP',
    language: 'ja'
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  // axios,
  render: h => h(App)
}).$mount('#app')

