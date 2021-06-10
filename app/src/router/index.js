import Vue from 'vue';
import Router from 'vue-router';

import SignUp from '../components/pages/SignUp.vue'
import SignIn from '../components/pages/SignIn.vue'
import DashBoard from '../components/pages/DashBoard.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/signin',
            name: 'SignIn',
            component: SignIn
        },
        {
            path: '/',
            name: 'DashBoard',
            component: DashBoard
        },
    ]
})