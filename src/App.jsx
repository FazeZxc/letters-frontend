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
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import socketIO from 'socket.io-client'
import { Navbar } from './components/Navbar'
import { Header } from './components/Header'
import { BACKEND_URL } from './store/urls'
import { ProfilePage } from './pages/ProfilePage'
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const token = Cookies.get('token')

function App() {
    const [backendUrl, setBACKEND_URL] = useRecoilState(BACKEND_URL)
    if (import.meta.env.MODE === 'development') {
        console.log('Development Mode')
        console.log(backendUrl)
    } else {
        setBACKEND_URL(VITE_BACKEND_URL)
        console.log(backendUrl)
    }

    const socket = socketIO.connect(backendUrl, {
        query: token,
    })
    return (
        <div className="h-dvh w-dvw bg-gray-900">
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
                        path="/profile"
                        element={
                            <>
                                <ProfilePage />
                                <Navbar />
                            </>
                        }
                    ></Route>
                    <Route
                        path="/app"
                        element={
                            <div className="h-5/6">
                                <AutoLogin />
                                <Header></Header>
                                <ChatPage socket={socket} />
                                <Navbar />
                            </div>
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

const AutoLogin = () => {
    const backendUrl = useRecoilValue(BACKEND_URL)
    const setAuthState = useSetRecoilState(authState)
    const navigate = useNavigate()
    useEffect(() => {
        async function autoLogin() {
            const token = Cookies.get('token')
            if (token) {
                try {
                    const response = await axios.post(
                        backendUrl + '/auth/auto-login',
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
