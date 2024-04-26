import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { authState } from '../store/authState'
import Cookies from 'js-cookie'
import { BACKEND_URL } from '../store/urls'
import loginIllus from '../assets/login.jpg'

export const LogIn = ({ socket }) => {
    const navigate = useNavigate()
    const setAuthState = useSetRecoilState(authState)
    const backendUrl = useRecoilValue(BACKEND_URL)
    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
    })

    function formInputHandler(event) {
        const { id } = event.target
        const { value } = event.target
        if (id == 'username') {
            setUserInput((prev) => ({ ...prev, username: value }))
        } else if (id == 'password') {
            setUserInput((prev) => ({ ...prev, password: value }))
        }
    }

    function inputValidation(event) {
        event.preventDefault()
        if (userInput.username && userInput.password) {
            logInUser()
        } else {
            console.log('all fields are required')
        }
    }

    async function logInUser() {
        try {
            console.log(backendUrl)
            const response = await axios.post(backendUrl + '/auth/login', {
                userName: userInput.username,
                password: userInput.password,
            })
            console.log(response.data.user)
            const { userName } = response.data.user
            setAuthState(response.data)
            Cookies.set('token', response.data.token, { expires: 7, path: '/' })
            socket.emit('newUser', { userName, socketID: socket.id })
            navigate('/app')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="h-full flex flex-col justify-center xl:items-center">
            <div className="flex flex-col gap-2 font-extrabold text-5xl text-left p-4">
                <span className="selection:hidden bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                    Letters
                </span>
                <p className="text-4xl">Welcome back</p>
            </div>
            <form
                onSubmit={inputValidation}
                className="px-4 form-control lg:w-[500px]  xl:w-[500px]"
            >
                <label htmlFor="username" className="label text-primary-accent">
                    Username
                </label>
                <input
                    className="input-accent input-md"
                    type="text"
                    id="username"
                    onChange={formInputHandler}
                    placeholder="Enter your username"
                    value={userInput.username}
                />
                <label htmlFor="password" className="label text-primary-accent">
                    Password
                </label>
                <input
                    className="input-accent input-md"
                    id="password"
                    type="password"
                    onChange={formInputHandler}
                    placeholder="password"
                    value={userInput.password}
                />
                <button
                    className="btn btn-primary my-6 text-primary-secondary"
                    onSubmit={inputValidation}
                >
                    Log In
                </button>
            </form>
            <div className="p-4 flex flex-row gap-2">
                <p className="text-secondary">New to Letters?</p>
                <a
                    onClick={() => navigate('/auth/register')}
                    className="text-primary underline"
                >
                    Create an account!
                </a>
            </div>
            <div className="p-4">
                <li>If you are just visiting:</li>
                <p className="px-4">Demo User : admin</p>
                <p className="px-4">Demo Pass : admin</p>
            </div>
        </div>
    )
}
