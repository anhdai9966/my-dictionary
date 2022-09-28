import HomePage from '~/pages/Home';
import AddPage from '~/pages/Add';
import DetailPage from '~/pages/Detail';
import ErrorPage from '~/pages/ErrorPage';

// public không cần đăng nhập
const publicRoutes = [
    {path: '/', component: HomePage},
    {path: '/add', component: AddPage},
    {path: '/detail/:id', component: DetailPage},
    {path: '*', component: ErrorPage},
]

const privateRoutes = [

]

export {
    publicRoutes,
    privateRoutes,
}