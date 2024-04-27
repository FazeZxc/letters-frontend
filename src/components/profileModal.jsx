import { ProfilePage } from '../pages/ProfilePage'

export const ProfileModal = ({ userData }) => {
    return (
        <div>
            <dialog id="smallProfileModal" className="modal">
                <div className="modal-box">
                    <ProfilePage userData={userData} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}
