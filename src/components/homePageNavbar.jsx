import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { authState } from '../store/authState'
import { Channels } from './Channels'

export const HomePageNavbar = () => {
    const navigate = useNavigate()
    const currentAuthState = useRecoilValue(authState)

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <Channels />
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a>Discover</a>
                        </li>
                        <li>
                            <a>Support</a>
                            <ul className="p-2">
                                <li>
                                    <a
                                        href="https://github.com/FazeZxc"
                                        target="_blank"
                                    >
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/in/abhinavmsn/"
                                        target="_blank"
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a>Blog</a>
                        </li>
                    </ul>
                </div>
                <a
                    onClick={() => navigate('/')}
                    className="selection:hidden text-xl rounded-3xl font-bold px-4 py-2 hover:shadow-lg shadow-black hover:bg-gradient-to-r hover:from-blue-600 hover:to-fuchsia-400 hover:bg-clip-text hover:text-transparent bg-transparent"
                >
                    Letters
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <a>Discover</a>
                    </li>
                    <li>
                        <details>
                            <summary>Support</summary>
                            <ul className="p-2">
                                <li>
                                    <a
                                        href="https://github.com/FazeZxc"
                                        target="_blank"
                                    >
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/in/abhinavmsn/"
                                        target="_blank"
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <a>Blog</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                {currentAuthState ? (
                    <a onClick={() => navigate('/app')} className="btn">
                        Open
                    </a>
                ) : (
                    <a onClick={() => navigate('/auth/login')} className="btn">
                        Login
                    </a>
                )}
            </div>
        </div>
    )
}
