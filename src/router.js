const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path:'/list',
        meta:{
            title:'datalist'
        },
        component:(resolve) => require(['./views/datalist.vue'], resolve)
    }

];
export default routers;