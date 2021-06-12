
const SignUp = () => import('../components/pages/SignUp.vue')
const SignIn = () => import('../components/pages/SignIn.vue')
const Dashboard = () => import('../components/pages/Dashboard.vue')

export default [
    { path: '/', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/signup', component: SignUp },
    { path: '/signin', component: SignIn },
]