import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Admin from '../components/admin/admin'
import Index from '../components/index/index'
import IndexIndex from '../components/index/indexIndex'
import ReadNews from '../components/readNew'
import Teacher from '../components/teachers'
import Publish from '../components/admin/publish'
import Manage from '../components/admin/manage'
import Tongji from '../components/admin/tongji'
import Medicine from '../components/admin/medicine'
import Print from '../components/admin/print'
import UserManage from '../components/admin/userManage'
import TeacherManage from '../components/admin/teacher'
import MainpicManage from '../components/admin/mainpic'
import global from '../global.js'
const router = new Router({
    mode: 'hash',
    routes: [{
            path: '/',
            name: 'Index',
            component: Index,
            children: [{
                    path: '',
                    component: IndexIndex
                }
            ]
        },
        {
            path: '/index',
            name: 'Index',
            component: Index
        },
        {
            path: '/readNews/:id/',
            name: 'readNews',
            component: ReadNews
        }, 
        {
            path: '/teachers/:id/',
            name: 'teachers',
            component: Teacher
        },
        {
            path: '/Admin',
            name: 'Admin',
            component: Admin,
            children: [{
                    path: '',
                    component: Tongji,

                }, {
                    path: 'medicine',
                    component: Medicine,

                }, {
                    path: 'print',
                    component: Print,
                }, 
                {
                    path: 'userMange',
                    component: UserManage,
                },
                {
                    path: 'teacher',
                    component: TeacherManage,
                },
                {
                    path: 'mainpic',
                    component: MainpicManage,
                },
                {
                    path: 'tongji',
                    component: Tongji,
                }

            ]
        }


    ]
})
router.afterEach(() => {
    window.scrollTo(0, 0)
})
Vue.directive({
    inserted: function(el,binding){
        document.title = el.dataset.title
    }
})


export default router