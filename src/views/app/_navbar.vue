<template>
  
  <div>
    <div class="row"> 
        <div class="col-12">
            <nav style="min-height: 20px;" class="header-navbar navbar-expand-md navbar navbar-with-menu fixed-top navbar-semi-light bg-gradient-x-grey-blue">
                <div class="navbar-wrapper">
                        
                    <div class="navbar-container content">

                        <div class="navbar-header">
                            <ul class="nav navbar-nav flex-row">
                                
                                <li class="dropdown nav-item">
                                    <a @click="toggleSidebar" class="nav-link nav-menu-main menu-toggle" href="#">
                                        <span class="mdi-24px mdi mdi-menu"></span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a style="letter-spacing: 1px;padding-left: 10px;color: #fff !important;" class="navbar-brand" href="">
                                        <span class="mdi-24px mdi mdi-alpha-b-box"></span> Brand</h2>
                                    </a>     
                                </li>

                            </ul>
                        </div>

                        <div class="collapse navbar-collapse">
                            <ul class="nav navbar-nav mr-auto float-left">

                                <li :key="item.id" v-for="item in topMenuItems" class="dropdown nav-item">
                                    <router-link class="nav-link" :to="{ name: item.routeName }" >{{ item.text }}</router-link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            
            <div :class="{'menu-collapsed' : !showSidebar}" class="main-menu menu-fixed menu-light menu-accordion menu-shadow">
                <div class="main-menu-content ps-container ps-theme-dark ps-active-y">
                    <ul class="navigation navigation-main">
                       
                        <template v-for="item in leftMenuItems" >

                            <li v-if="item.title" :key="item.id" class="navigation-header">
                                <span>{{ item.text }}</span>
                            </li>

                            <li v-else :key="item.id" :class="{'open':ItemSelected === item.id}" class="nav-item has-sub">
                                
                                <a class="nav-link" @click="redirect(item)" href="#">
                                    <span :class="item.iconClass"></span>
                                    <span class="menu-title">{{ item.text }}</span>
                                    <span v-show="item.subitems" style="right: 0" :class="[ItemSelected === item.id ? 'mdi-chevron-down':'mdi-chevron-up']" class="mr-2 position-absolute mdi"></span>                            
                                </a>
                            
                                <ul :class="{'left-menu-collapsed':ItemSelected === item.id}" class="menu-content left-menu">
                                    <li :class="{'active':$route.name === subitem.routeName}" :key="subitem.id" v-for="subitem in item.subitems" class="is-shown">
                                        <router-link class="menu-item" :to="{ name: subitem.routeName }" >
                                            <span v-if="item.iconClass" :class="subitem.iconClass"></span> {{ subitem.text }}
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
     </div>
  </div>
</template>

<script>

import { logout } from '@/config/auth'

export default {
    data () {
        return {
            ItemSelected:null,
            topMenuItems:[
                { id:1,routeName : 'events',text:'Events' },
                { id:2,routeName : 'markets',text:'Markets' },
                { id:3,routeName : 'users',text:'Users' },
                { id:4,routeName : 'about-us',text:'About Us' },
                { id:5,routeName : 'lang',text:'Lang' },
                { id:6,routeName : 'auth/sign_in',text:'Login' }
            ],
            leftMenuItems:[
                {
                    id:1,
                    routeName:null,
                    text:'Events',
                    count:true,
                    iconClass:'mr-2 mdi mdi-calendar-range',
                    subitems:[
                        { id:1,routeName : 'events',text:'List Events',iconClass:false, },
                    ]
                },
                {
                    id:2,
                    routeName:null,
                    text:'Users Manager',
                    count:true,
                    iconClass:'mr-2 mdi mdi-account-multiple-outline',
                    subitems:[
                        { id:2,routeName : 'users',text:'Users',iconClass:false, },
                        { id:3,routeName : 'roles',text:'Roles',iconClass:false, },
                        { id:4,routeName : 'permissions',text:'Permissions',iconClass:false, },
                        { id:5,routeName : 'roles.permissions',text:'Give Role Permissions',iconClass:false, },
                    ]
                },
                {
                    id:3,
                    routeName:null,
                    text:'Bookmakers',
                    count:true,
                    iconClass:'mr-2 mdi mdi-home-outline',
                    subitems:[
                        { id:8,routeName : 'bookmakers',text:'List Bookmakers',iconClass:false, },
                    ]
                },
                {
                    id:4,
                    routeName:null,
                    text:'Bets Markets',
                    count:true,
                    iconClass:'mr-2 mdi mdi-cart-outline',
                    subitems:[
                        { id:6,routeName : 'markets',text:'List Markets',iconClass:false, },
                        { id:7,routeName : 'bets',text:'List Bets',iconClass:false, },
                    ]
                },
                
                {
                    id:5,
                    title:true,
                    text:'General'
                },
                {
                    id:6,
                    routeName:'setting',
                    text:'Setting',
                    count:null,
                    iconClass:'mr-2 mdi mdi-settings-outline',
                },
                {
                    id:7,
                    routeName:'logout',
                    text:'Exit',
                    count:null,
                    action : function(){
                        logout()
                    },
                    iconClass:'mr-2 mdi mdi-power',
                }
            ]
        }
    },
    computed:{
        showSidebar(){
            return this.$store.state.showSidebar
        }
    },
        
    methods:{
        
        redirect(item){

            this.ItemSelected = item.id
            
            if (item.action != undefined){
                item.action.call()
            }

            if (item.routeName){
                this.$router.push({name:item.routeName})
            }
        },
        toggleSidebar(){
            this.$store.state.showSidebar = !this.$store.state.showSidebar
        }
    }
}
</script>
 
<style>
.main-menu.menu-light .navigation>li.open{
    border-left: 4px solid #00B5B8;
}

.left-menu{
    transition: all 600ms ease-out;
    display: none;
}

.left-menu-collapsed{
    display: block;
}

span.menu-title{
    font-size: 0.9rem;
}
.menu-accordion{
    width: 261px;
    position: fixed;
    left: 0;
    top: 59px;
    display: table-cell;
}
.menu-collapsed{
    margin-left: -260px;
}
.badge.badge.float-right {
    margin-left: .5rem !important;
    margin-top: .17rem !important;
}

.main-menu .navigation .has-sub a.nav-link:hover{
    background-color: #f0f0f0
}

.main-menu.menu-light .navigation>li ul li>a:hover{
    background-color: #f0f0f0
}
.main-menu.menu-light .navigation>li.open>a {
    color: #2C3648 !important;
    background: #f5f5f5 !important;
}
.main-menu.menu-light .navigation>li ul li>a {
    padding: 10px 18px 10px 50px !important;
}
.main-menu.menu-light .navigation>li ul .active>a {
    color: #00B5B8 !important;
    font-weight: 500 !important;
}
.main-menu.menu-light .navigation>li .active>a {
    color: #00B5B8;
    font-weight: 500;
}
.main-menu.menu-light .navigation>li ul .active {
    background: 0 0 !important;
}
.main-menu.menu-light .navigation>li .active {
    background: #F0F0F0 !important;
}
.main-menu.menu-light .navigation>li ul li {
    color: #404E67 !important;
    background: 0 0 !important;
}
.navigation li {
    position: relative !important;
    white-space: nowrap !important;
}
.main-menu.menu-light .navigation>li ul {
    padding: 0 !important;
    margin: 0 !important;
    font-size: 0.9rem !important;
}
.main-menu ul {
    list-style: none !important;
    margin: 0 !important;
    padding: 0 !important;
}
.main-menu.menu-light .navigation>li>ul, .main-menu.menu-light ul.menu-popout{
    background: #FFF !important;
}
.main-menu.menu-light .navigation>li>a {
    padding: 10px 30px 10px 14px !important;
}
.main-menu.menu-light .navigation li a {
    color: #404E67 !important;
}
.navigation li a {
    display: block !important;
    text-overflow: ellipsis !important;
    overflow: hidden !important;
    border-left: 4px solid transparent !important;
}

.main-menu a {
    outline: 0 !important;
}
.navigation .navigation-header {
    font-weight: 400 !important;
    line-height: 1.2 !important;
    padding: 12px 22px !important;
    font-size: 0.9rem !important;
    text-transform: uppercase !important;
}

.main-menu.menu-light .navigation .navigation-header span{
    font-weight: 500;
}
.navigation, .navigation .navigation-header {
    font-family: Montserrat,Georgia,'Times New Roman',Times,serif;
}
.navigation li {
    position: relative;
    white-space: nowrap;
}
.main-menu.menu-light .navigation {
    background: #FFF;
}
.main-menu ul.navigation-main {
    overflow-x: hidden;
}
.main-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
.navigation {
    font-size: 1rem;
    font-weight: 300;
    overflow-y: hidden;
    padding-bottom: 20px;
}
.navigation, .navigation .navigation-header {
    font-family: Montserrat,Georgia,'Times New Roman',Times,serif;
}
.main-menu .main-menu-content {
    height: 100%;
    position: relative;
}
.ps-theme-dark {
    -ms-touch-action: none;
    touch-action: none;
    overflow: hidden!important;
    -ms-overflow-style: none;
}
.ps-container {
    -ms-touch-action: none;
    touch-action: none;
    overflow: hidden!important;
    -ms-overflow-style: none;
}
.main-menu.menu-shadow {
    -webkit-box-shadow: 1px 0 20px rgba(0,0,0,.1);
    box-shadow: 1px 0 20px rgba(0,0,0,.1);
}
.main-menu.menu-fixed {
    position: fixed;
    /*top: 4rem;*/
    height: -webkit-calc(100% - 4rem);
    height: -moz-calc(100% - 4rem);
    height: calc(100% - 4rem);
}
.main-menu.menu-light {
    color: #404E67;
    background: #FFF;
    border-right: 1px solid #E4E7ED;
}
.main-menu {
    z-index: 1000;
    position: absolute;
    display: table-cell;
}
body.vertical-layout.vertical-menu.menu-expanded .main-menu {
    width: 240px;
    -webkit-transition: .3s ease all;
    -o-transition: .3s ease all;
    -moz-transition: .3s ease all;
    transition: .3s ease all;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
}
.header-navbar .navbar-wrapper{
    width: 100%
}
.header-navbar .navbar-header .navbar-brand .brand-text {
    display: inline;
    padding-left: 10px;
    font-weight: 500;
    letter-spacing: 1px;
}
body.vertical-layout.vertical-menu .navbar .navbar-brand {
    white-space: nowrap;
}
.header-navbar .navbar-header .navbar-brand {
    padding: 17px 0 !important;
}
.navbar-brand {
    display: inline-block;
    padding-top: .31875rem;
    padding-bottom: .31875rem;
    margin-right: 1rem;
    font-size: 1.35rem;
    line-height: inherit;
}
.header-navbar .nav-item+.nav-item, .header-navbar.navbar-without-menu .navbar-container {
    margin-left: 0;
}
.flex-row {
    -webkit-box-orient: horizontal!important;
    -webkit-box-direction: normal!important;
    -webkit-flex-direction: row!important;
    -moz-box-orient: horizontal!important;
    -ms-flex-direction: row!important;
    flex-direction: row!important;
}
/*
.navbar-semi-light .navbar-header {
    background: #FFF;
}
*/
body.vertical-layout.vertical-menu.menu-expanded .navbar .navbar-header {
    float: left;
    width: 240px;
}
.header-navbar .navbar-header {
    width: 240px;
    height: 59px;
    float: left;
    position: relative;
    /*padding: 0 1rem;*/
    transition: .3s ease all;
}
ul{
  list-style: none;
  padding-inline-start: 0px !important;
}
.bg-gradient-x-grey-blue {
    background-image: -webkit-gradient(linear,left top,right top,from(#404E67),to(#6F85AD));
    background-image: -webkit-linear-gradient(left,#404E67 0,#6F85AD 100%);
    background-image: -moz-linear-gradient(left,#404E67 0,#6F85AD 100%);
    background-image: -o-linear-gradient(left,#404E67 0,#6F85AD 100%);
    background-image: linear-gradient(to right,#404E67 0,#6F85AD 100%);
    background-repeat: repeat-x;
}
</style>

