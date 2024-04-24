import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const LogIn = () => {
    const navigate = useNavigate()
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
            const response = await axios.post(
                'http://localhost:3000/auth/login',
                {
                    userName: userInput.username,
                    password: userInput.password,
                }
            )
            console.log(response)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={inputValidation}>
                <input
                    type="text"
                    id="username"
                    onChange={formInputHandler}
                    placeholder="username"
                    value={userInput.username}
                />
                <input
                    id="password"
                    type="password"
                    onChange={formInputHandler}
                    placeholder="password"
                    value={userInput.password}
                />
                <button onSubmit={inputValidation}>Log In</button>
            </form>
        </div>
    )
}
