import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { publicRoutes } from './routes';

import { windowHeight } from '~/utils';

function App() {
    useEffect(() => {
        document.title = 'My Dictionary';
        // tạo chiều cao của màn hình
        window.addEventListener('resize', windowHeight);
        windowHeight();
    }, []);

    // const click = () => {
    //   console.log('run')
    // }

    // const items = [
    //   {title: 'Hủy', action: click},
    //   {title: 'Xóa', color: '#FF3B30', action: click},
    // ]
    /* <Alert title={'Gỡ khỏi mục yêu thích?'} subtitle={'Gỡ khỏi mục yêu thích?'} items={items} type={'horizontal'}/> */
    /* <HomePage />

                <div className="container detail" ref={detailRef}>
                    {!isEmpty(detailDictionary) && <DetailPage />}
                </div>

                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/detail">detail</Link>
                    </li>
                    <li>
                        <Link to="/add">add</Link>
                    </li>
                </ul>

                <div className="container edit" ref={editRef}>
                    <EditPage />
                </div> */

    return (
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={<Page />}
                        />
                    );
                })}
            </Routes>
    );
}

export default App;
