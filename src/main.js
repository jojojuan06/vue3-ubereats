import { createApp } from 'vue'
import App from './App.vue'

//import des router
import {createRouter,createWebHashHistory} from 'vue-router'

//import component
import HomePage from './components/HomePage.vue'
import Restaurant from './components/Restaurant.vue'

const routes = [
    { 
        path: '/', 
        name:'HomePage',
        component: HomePage 
    },
    { 
        path: '/restaurant',
        name: 'Restaurant',
        component: Restaurant 
    },
]

//creation du router
const router = createRouter({
    history:createWebHashHistory(),
    routes
})
//creation de app avec #app sur lequel on agie dans le template principale de l'app
const VueApp = createApp(App)

VueApp.use(router)
//use pour utiliser les router
VueApp.mount('#app');
