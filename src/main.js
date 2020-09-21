import Vue from 'vue'
import App from '../src/components/App.vue'
import VueResource from 'vue-resource'
import vuetify from './plugins/vuetify' // path to vuetify export
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(VueResource);

new Vue({
  vuetify,
  el: '#app',
  render: h => h(App),
  created(){
    this.$vuetify.theme.dark = true
  }
})
