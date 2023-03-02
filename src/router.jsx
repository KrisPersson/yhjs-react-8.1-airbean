import { createBrowserRouter } from 'react-router-dom'

import Home from './views/Home'
import About from './views/About'
import Menu from './views/Menu'
import Profile from './views/Profile'
import Status from './views/Status'
import Error from './views/Error'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/menu',
        element: <Menu />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/status',
        element: <Status />
    }
]) 

export default router