const main = r => require.ensure([], () => r(require('@/layout/main.vue')), 'main')
const index = r => require.ensure([], () => r(require('@/view/index/index.vue')), 'index')
const about = r => require.ensure([], () => r(require('@/view/about/about.vue')), 'about')
const detail = r => require.ensure([], () => r(require('@/view/detail/detail.vue')), 'detail')
const music = r => require.ensure([], () => r(require('@/view/music/music.vue')), 'music')
const error = r => require.ensure([], () => r(require('@/view/404/404.vue')), 'error');
const defaultRouter = [
    {
        path: "/",
        component: main, // 布局页 -- 放置公共组件
        redirect: {
            name: "index"
        },
        children:[
            {
                path: '/index',
                component: index,
                name: 'index',
                meta: {
                    title: 'index'
                }
            },
            {
                path: '/about',
                component: about,
                name: 'about',
                meta: {
                    title: 'about'
                }
            },
            {
                path: '/detail',
                component: detail,
                name: 'detail',
                meta: {
                    title: 'detail'
                }
            },
            {
                path: '/music',
                component: music,
                name: 'music',
                meta: {
                    title: 'music'
                }
            }
        ]
    },
    {
        path: '*',
        component: error,
        name: '404',
        meta: {
            title: '404'
        }
    }
]

export default defaultRouter;