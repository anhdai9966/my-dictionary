import HomePage from '../pages/Home';
import AddPage from '../pages/Add';
import DetailPage from '../pages/Detail';

// public không cần đăng nhập
const publicRoutes = [
    {path: '/', component: HomePage},
    {path: '/add', component: AddPage},
    {path: '/detail', component: DetailPage},
]

const privateRoutes = [

]

export {
    publicRoutes,
    privateRoutes,
}