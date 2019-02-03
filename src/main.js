import Vue from 'vue'
import './bootstrap'
import App from './App.vue'
import { store } from './store'
import VueLodash from 'vue-lodash'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import pagination from '@/views/helpers/Pagination.vue'
import loading from '@/views/helpers/Loading.vue'

import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCircleNotch)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('pagination', pagination)
Vue.component('loading', loading)

Vue.use(BootstrapVue)
Vue.use(VueLodash)



/*
Vue.config.devtools = false
Vue.config.debug = false
Vue.config.silent = true
*/

router.beforeEach((to, from, next) => {
	
	const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

	if (nearestWithTitle){
		document.title = to.meta.title
	}

	next()
})

Vue.config.productionTip = false

//site style file


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import './assets/scss/bootstrap-custom.scss'
import './assets/scss/app.scss'

new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app')