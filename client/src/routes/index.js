import {createBrowserRouter} from 'react-router-dom'
import App from "../App"
import RegisterPage from "../pages/RegisterPage"
import Login from "../pages/Login"
import Home from "../pages/Home"
import MessagePage from "../components/MessagePage"
import AuthLayout from '../layout/AuthLayout'
import CheckPasswordPage from "../pages/CheckPasswordPage"
import ForgotPassword from '../pages/ForgotPassword'

const router= createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children:[
            {
                path: "register",
                element: <AuthLayout><RegisterPage /></AuthLayout>

            },
            {
                path:"",
                element: <AuthLayout><Login /></AuthLayout>
            },
            
            {
                path:"/home",
                element: <Home />,
                children: [
                    {
                        path:":userId",
                        element: <MessagePage />
                    }
                ]
            },
            {
                path:"/forgot-password",
                element: <AuthLayout><ForgotPassword/></AuthLayout>,

            }
        ]
    }
])

export default router