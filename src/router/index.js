import {createRouter, createWebHistory} from 'vue-router';
import {useUserStore} from '../store/user';
import Home from '../components/Home.vue';
import List from '../components/List';
import Upload from '../components/upload/Upload';

export const LOGIN_PAGE_NAME = 'login';
export const HOME_PAGE_NAME = 'Home';

const routes = [
    {
        path: '/books',
        name: 'Home',
        component: List,
        meta: {
            requiresAuth: true,
            title: 'Books'
        },
        children: [
            {
                path: ':fullpath+',
                name: 'folder',
                meta: {requiresAuth: true},
                component: () => import('./../components/authenticate/Login.vue'),
            }
        ]
    },
    {
        path: '/upload',
        name: 'upload',
        component: Upload,
        meta: {
            requiresAuth: true,
            title: 'Upload'
        }
    },
    {
        path: '/authenticate',
        name: 'authenticate',
        meta: {requiresAuth: false},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('./../components/authenticate/Authenticate.vue'),
        children: [
            {
                path: 'login',
                name: LOGIN_PAGE_NAME,
                meta: {requiresAuth: false},
                component: () => import('./../components/authenticate/Login.vue'),
            }
        ],
    },

    //Redirections
    {
        path: '/login',
        redirect: {
            name: LOGIN_PAGE_NAME
        }
    }
];
const router = createRouter({
    history: createWebHistory(process.env.VUE_APP_BASE_URL),
    routes,
});
router.beforeEach((to, from, next) => {

    const user = useUserStore();

    // by defining in by negation (to.meta.requiresAuth !== false) every page which is not explicitly
    // defining to be without authentication needs to be authentication (security concerns)
    if (to.matched.some((record) => record.meta.requiresAuth !== false)) {
        if (user.isLogged) {
            next();
        } else {
            next({name: LOGIN_PAGE_NAME});
        }
    } else {
        next();
    }
});

export default router;