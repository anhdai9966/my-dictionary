import HomePage from '~/pages/Home';
import AddPage from '~/pages/Add';
import EditPage from '~/pages/Edit';
import DetailPage from '~/pages/Detail';
import ErrorPage from '~/pages/Error';

// public không cần đăng nhập
const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/add', component: AddPage },
    { path: '/edit/:id', component: EditPage },
    { path: '/detail/:id', component: DetailPage },
    { path: '*', component: ErrorPage },
]

const privateRoutes = [

]

export {
    publicRoutes,
    privateRoutes,
}