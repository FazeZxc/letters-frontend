import { useNavigate } from 'react-router-dom'
import { LogoutButton } from './LogoutButton'

export const SettingsMenu = () => {
    const navigate = useNavigate()
    return (
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <ul className="menu bg-base-200 w-full rounded-box">
                    <li className="menu-title">Options</li>
                    <li>
                        <button onClick={() => navigate('/profile')}>
                            Profile
                        </button>
                    </li>
                    <li>
                        <LogoutButton />
                    </li>
                </ul>
                <ul></ul>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}
