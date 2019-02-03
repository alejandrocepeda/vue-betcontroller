import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
			path: '/about-us',
			meta: {title: 'About Us'},
			component: () => import('@/components/AboutUs.vue')
		},
		{
			path: '/lang',
			meta: {title: 'Languajes'},
			component: () => import('@/components/Lang.vue')
		},
		{
			path: '/contacs',
			meta: {title: 'Contacs'},
			component: () => import('@/components/Contacs.vue')
		},
		{
			path: '/events',
			meta: {title: 'Events'},
			component: () => import('@/components/Events.vue')
		},
		{
			path: '/auth',
			meta: {title: 'Login'},
			component: () => import('@/views/auth/Login.vue')
		}
  ]
})