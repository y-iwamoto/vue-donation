import store from '../store'

const SignUp = () => import('../components/pages/SignUp.vue')
const SignIn = () => import('../components/pages/SignIn.vue')
const Dashboard = () => import('../components/pages/Dashboard.vue')

export default [
    { path: '/', component: Dashboard, meta: { requiresAuth: true },
        beforeEnter(to ,from, next){
            if (!store.getters["users/getAuthenticateInfo"].uid) next({ path: '/signin' })
            store.dispatch('users/fetchUser', store.getters["users/getAuthenticateInfo"])
                .then(() => next()).catch(() => {});
        }
     },
    { path: '/signup', component: SignUp },
    { path: '/signin', component: SignIn },
]