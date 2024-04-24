import { useRecoilState, useRecoilValue } from 'recoil'
import { authState } from '../store/authState'
import { LogoutButton } from '../components/LogoutButton'

export const HomePage = () => {
    const currentAuthState = useRecoilValue(authState)
    console.log(currentAuthState);
    return <div>{currentAuthState != null ? <LogoutButton /> : null}</div>
}
