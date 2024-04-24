import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
export const LogoutButton = () => {
    const navigate = useNavigate()
    function logout() {
        Cookies.remove('token')
        navigate('/auth/login')
    }
    return <button onClick={logout}>Logout</button>
}
