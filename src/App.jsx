import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { SignIn } from './components/SignIn'
import { LogIn } from './components/Login'
import { HomePage } from './pages/HomePage'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { authState } from './store/authState'
import { ChatPage } from './pages/ChatPage'
import { useSetRecoilState } from 'recoil'
import socketIO from 'socket.io-client'
import { LogoutButton } from './components/LogoutButton'

const token = Cookies.get('token')
const socket = socketIO.connect('http://localhost:3000', {
    query: token,
})
function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth/register" Component={SignIn}></Route>
                    <Route
                        path="/auth/login"
                        element={<LogIn socket={socket} />}
                    ></Route>
                    <Route
                        path="/"
                        element={
                            <>
                                <HomePage />
                            </>
                        }
                    ></Route>
                    <Route
                        path="/app"
                        element={
                            <>
                                <AutoLogin />
                                <ChatPage socket={socket} />
                                <LogoutButton />
                            </>
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

const AutoLogin = () => {
    const setAuthState = useSetRecoilState(authState)
    const navigate = useNavigate()
    useEffect(() => {
        async function autoLogin() {
            const token = Cookies.get('token')
            if (token) {
                try {
                    const response = await axios.post(
                        'http://localhost:3000/auth/auto-login',
                        {
                            token,
                        }
                    )
                    setAuthState(response.data)
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log('not signed in')
                navigate('/auth/login')
            }
        }
        autoLogin()
    }, [])

    return <div></div>
}

export default App
