import { useRecoilState, useRecoilValue } from 'recoil'
import { authState } from '../store/authState'
import { LogoutButton } from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
    const currentAuthState = useRecoilValue(authState)
    const navigate = useNavigate()
    console.log(currentAuthState)
    return (
        <div>
            <button
                onClick={() => navigate('/auth/login')}
                className="btn btn-secondary"
            >
                Log In
            </button>
            <div>{currentAuthState != null ? <LogoutButton /> : null}</div>
        </div>
    )
}
