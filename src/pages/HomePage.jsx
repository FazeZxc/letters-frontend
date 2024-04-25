import { useRecoilState, useRecoilValue } from 'recoil'
import { authState } from '../store/authState'
import { LogoutButton } from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
    const currentAuthState = useRecoilValue(authState)
    const navigate = useNavigate()
    return (
        <div>
            <button
                onClick={() => navigate('/auth/login')}
                className="btn btn-secondary"
            >
                Log In
            </button>
            <button
                onClick={() => navigate('/auth/register')}
                className="btn btn-primary"
            >
                Create Account
            </button>
            <button
                onClick={() => navigate('/app')}
                className="btn btn-secondary"
            >
                Global Chat
            </button>
            <button
                onClick={() => navigate('/profile')}
                className="btn btn-primary"
            >
                Profile
            </button>
            <div>{currentAuthState != null ? <LogoutButton /> : null}</div>
        </div>
    )
}
