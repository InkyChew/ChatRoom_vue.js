// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import bootsrapJs from 'bootstrap'
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css'
import fontawesome from '@fortawesome/fontawesome'
import faImages from '@fortawesome/fontawesome-free-regular/faImages'
import faUser from '@fortawesome/fontawesome-free-solid/faUserCircle'

fontawesome.library.add(faImages)
fontawesome.library.add(faUser)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  bootsrapJs,
  bootstrapCss,
  fontawesome,
  components: { App },
  template: '<App/>'
})
