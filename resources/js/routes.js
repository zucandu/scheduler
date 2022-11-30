const Storefront = () => import(`./components/storefront/Storefront`)
const Index = () => import(`./components/storefront/Index`)
const Privacy = () => import(`./components/storefront/Privacy`)
const TermsAndConditions = () => import(`./components/storefront/TermsAndConditions`)
const UserLogin = () => import(`./components/storefront/UserLogin`)
const UserPasswordForgotten = () => import(`./components/storefront/UserPasswordForgotten`)
const UserPasswordReset = () => import(`./components/storefront/UserPasswordReset`)
const UserLogout = () => import(`./components/storefront/UserLogout`)
const UserLayout = () => import(`./components/storefront/UserLayout`)
const UserDashboard = () => import(`./components/storefront/UserDashboard`)
const UserProfile = () => import(`./components/storefront/UserProfile`)
const UserCronJob = () => import(`./components/storefront/UserCronJob`)
const UserScheduleSalesPrice = () => import(`./components/storefront/UserScheduleSalesPrice`)


const storefrontChildrenRoutes = [
    {
        path: '/',
        name: 'index',
        component: Index,
    },
    {
        path: '/privacy',
        name: 'privacy',
        component: Privacy,
    },
    {
        path: '/terms-and-conditions',
        name: 'terms_and_conditions',
        component: TermsAndConditions,
    },
    {
        path: '/login',
        name: 'login',
        component: UserLogin,
    },
    {
        path: '/forgot-password',
        name: 'forgot_password',
        component: UserPasswordForgotten,
    },
    {
        path: '/reset-password/:token',
        name: 'reset_password',
        component: UserPasswordReset,
    },
    {
        path: '/store',
        name: 'user_panel',
        component: UserLayout,
        redirect: { name: `user_dashboard` },
        children: [
            {
                path: 'dashboard',
                name: 'user_dashboard',
                component: UserDashboard,
            },
            {
                path: 'profile',
                name: 'user_profile',
                component: UserProfile,
            },
            {
                path: 'cron',
                name: 'user_cron',
                component: UserCronJob,
            },
            {
                path: 'schedule-sales-price',
                name: 'user_schedule_sales_price',
                component: UserScheduleSalesPrice,
            },
        ]
    },
    {
        path: '/logout',
        name: 'logout',
        component: UserLogout,
    },
]

export const routes = [
    {
        path: '/',
        component: Storefront,
        children: storefrontChildrenRoutes
    }
]