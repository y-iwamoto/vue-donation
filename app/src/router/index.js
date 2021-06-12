import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes'
import store from '../store'

Vue.use(VueRouter);
let router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach(async (to, from, next) => {
    try {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            const valid = await store.dispatch('users/checkUser')
            valid ? next() : next({ path: '/signin' })
        } else {
            next()
        }
    } catch(e) {
        next({path: '/signin'})
    }
})

export default router