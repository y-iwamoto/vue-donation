import Vue from 'vue';
import Router from 'vue-router';

import SignUp from '../components/pages/SignUp.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUp
        },
    ]
})