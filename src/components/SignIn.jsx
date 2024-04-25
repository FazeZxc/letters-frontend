import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SignIn = () => {
    const navigate = useNavigate()
    const [userInput, setUserInput] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        cPassword: '',
    })

    function formInputHandler(event) {
        const { id } = event.target
        const { value } = event.target
        if (id == 'firstname') {
            setUserInput((prev) => ({ ...prev, firstname: value }))
        } else if (id == 'lastname') {
            setUserInput((prev) => ({ ...prev, lastname: value }))
        } else if (id == 'username') {
            setUserInput((prev) => ({ ...prev, username: value }))
        } else if (id == 'email') {
            setUserInput((prev) => ({ ...prev, email: value }))
        } else if (id == 'password') {
            setUserInput((prev) => ({ ...prev, password: value }))
        } else if (id == 'cPassword') {
            setUserInput((prev) => ({ ...prev, cPassword: value }))
        }
    }

    function inputValidation(event) {
        event.preventDefault()
        if (userInput.cPassword === userInput.password) {
            if (
                userInput.firstname &&
                userInput.lastname &&
                userInput.username &&
                userInput.email
            ) {
                signUpUser()
            } else {
                console.log('all fields are required')
            }
        } else {
            console.error('password didnt matched')
        }
    }

    async function signUpUser() {
        try {
            const response = await axios.post('https://letters-backend-f1xc.onrender.com/auth/register', {
                firstName: userInput.firstname,
                lastName: userInput.lastname,
                userName: userInput.username,
                email: userInput.email,
                password: userInput.password,
            })
            console.log(response);
            navigate('/auth/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={inputValidation}>
                <input
                    type="text"
                    onChange={formInputHandler}
                    id="firstname"
                    placeholder="first name"
                    value={userInput.firstname}
                />
                <input
                    type="text"
                    id="lastname"
                    placeholder="last name"
                    onChange={formInputHandler}
                    value={userInput.lastname}
                />
                <input
                    type="text"
                    id="username"
                    onChange={formInputHandler}
                    placeholder="username"
                    value={userInput.username}
                />
                <input
                    id="email"
                    type="email"
                    onChange={formInputHandler}
                    placeholder="email"
                    value={userInput.email}
                />
                <input
                    id="password"
                    type="password"
                    onChange={formInputHandler}
                    placeholder="password"
                    value={userInput.password}
                />
                <input
                    id="cPassword"
                    type="text"
                    onChange={formInputHandler}
                    placeholder="cPassword"
                    value={userInput.cPassword}
                />
                <button onSubmit={inputValidation}>Sign Up</button>
            </form>
        </div>
    )
}
