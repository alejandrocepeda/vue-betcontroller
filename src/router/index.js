import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  	routes: [
		{
			path: '/',
			component: () => import('@/views/app/_layout.vue'),
			redirect: {name:'dashboard'},
			children: [
				{
					path: '/app/dashboard',
					name: 'dashboard',
					meta: {title: 'Dashboard'},
					component: () => import('@/views/app/dashboard'),
				},
				{
					path: '/app/events',
					name: 'events',
					meta: {title: 'Events'},
					component: () => import('@/views/app/events'),
				},
				{
					path: '/app/events/:id',
					name: 'events-id',
					meta: {title: 'Events'},
					component: () => import('@/views/app/events/show.vue'),
					props: true
				},
				{
					path: '/app/markets',
					name: 'markets',
					meta: {title: 'Markets'},
					component: () => import('@/views/app/markets'),
				},
				{
					path: '/app/markets/:id',
					name: 'markets-id',
					meta: {title: 'Markets'},
					component: () => import('@/views/app/markets/show.vue'),
					props: true
				},
				{
					path: '/app/users',
					name: 'users',
					meta: {title: 'Users'},
					component: () => import('@/views/app/users')
				},
				{
					path: '/app/users/:id',
					name: 'users-id',
					meta: {title: 'Users'},
					component: () => import('@/views/app/users/show.vue'),
					props: true
				},
				{
					path: '/app/about-us',
					name: 'about-us',
					meta: {title: 'About Us'},
					component: () => import('@/views/app/aboutus')
				},
				{
					path: '/app/lang',
					name: 'lang',
					meta: {title: 'Languajes'},
					component: () => import('@/views/app/lang')
				}
			]
		},
		{
			path: '/auth',
			name: 'auth',
			meta: {isPublic: true},
			component: () => import('@/views/auth/_layout.vue'),
			children: [
				{
					path: '/auth/sign_in',
					name: 'auth/sign_in',
					meta: {title: 'Sign In'},
					component: () => import('@/views/auth/Login.vue'),
					
				},
				{
					path: '/auth/sign_up',
					name:'sign_up',
					meta: {title: 'Sign Up'},
					component: () => import('@/views/auth/Register.vue'),
				},
				{
					path: '/auth/password_reset',
					name:'password_reset',
					meta: {title: 'Password_Reset'},
					component: () => import('@/views/auth/PasswordReset.vue'),
				}
			]
		}
  ]
})
