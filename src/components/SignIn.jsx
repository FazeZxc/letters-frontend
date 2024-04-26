import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { BACKEND_URL } from '../store/urls'

export const SignIn = () => {
    const navigate = useNavigate()
    const backendUrl = useRecoilValue(BACKEND_URL)
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
            const response = await axios.post(backendUrl + '/auth/register', {
                firstName: userInput.firstname,
                lastName: userInput.lastname,
                userName: userInput.username,
                email: userInput.email,
                password: userInput.password,
            })
            console.log(response)
            navigate('/auth/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col justify-center py-4 xl:items-center xl:pt-12">
            <div className="flex flex-col gap-2 font-extrabold lg:text-left text-center">
                <p className="text-4xl px-4 underline">
                    Create Your Letters Account.
                </p>
            </div>
            <form
                onSubmit={inputValidation}
                className="px-4 form-control lg:w-[500px] xl:w-[500px]"
            >
                <label
                    htmlFor="firstname"
                    className="label text-primary-accent"
                >
                    What is your first name.
                </label>
                <input
                    type="text"
                    onChange={formInputHandler}
                    id="firstname"
                    placeholder="Enter first name"
                    value={userInput.firstname}
                    className="input-accent input-sm"
                />
                <label htmlFor="lastname" className="label text-primary-accent">
                    And your last name.
                </label>
                <input
                    className="input-accent input-sm"
                    type="text"
                    id="lastname"
                    placeholder="Enter last name"
                    onChange={formInputHandler}
                    value={userInput.lastname}
                />
                <label htmlFor="username" className="label text-primary-accent">
                    This is what others will see you as.
                </label>
                <input
                    className="input-accent input-sm"
                    type="text"
                    id="username"
                    onChange={formInputHandler}
                    placeholder="Pick a username"
                    value={userInput.username}
                />
                <label htmlFor="lastname" className="label text-red-500">
                    Required.
                </label>
                <input
                    className="input-accent input-sm"
                    id="email"
                    type="email"
                    onChange={formInputHandler}
                    placeholder="Enter your email address"
                    value={userInput.email}
                />
                <label
                    htmlFor="lastname"
                    className="label text-primary-secondary"
                >
                    Please choose a strong password.
                </label>
                <input
                    className="input-accent input-sm"
                    id="password"
                    type="password"
                    onChange={formInputHandler}
                    placeholder="Create a new password"
                    value={userInput.password}
                />
                <label htmlFor="lastname" className="label text-red-500">
                    Required.
                </label>
                <input
                    className="input-accent input-sm"
                    id="cPassword"
                    type="text"
                    onChange={formInputHandler}
                    placeholder="Re-enter password"
                    value={userInput.cPassword}
                />
                <button
                    onSubmit={inputValidation}
                    className="btn btn-primary my-6 text-primary-secondary"
                >
                    Sign Up
                </button>
            </form>
            <div className="px-4 flex flex-row gap-2">
                <p className="text-secondary">Already have an account?</p>
                <a
                    onClick={() => navigate('/auth/login')}
                    className="text-primary underline"
                >
                    Log in instead
                </a>
            </div>
        </div>
    )
}
