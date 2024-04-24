import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

const socket = socketIO.connect('http://localhost:3000')
function App() {
    const setAuthState = useSetRecoilState(authState)

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
            }
        }
        autoLogin()
    }, [])
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth/register" Component={SignIn}></Route>
                    <Route
                        path="/auth/login"
                        element={<LogIn socket={socket} />}
                    ></Route>
                    <Route path="/" Component={HomePage}></Route>
                    <Route
                        path="/app"
                        element={<ChatPage socket={socket} />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
