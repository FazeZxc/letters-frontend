import { useRecoilValue } from 'recoil'
import { authState } from '../store/authState'

export const ProfilePage = () => {
    const currentAuthState = useRecoilValue(authState)
    return (
        <div className="h-5/6 xl:items-center flex flex-col justify-center content-between">
            {currentAuthState ? (
                <div className="bg-black/50 p-4 xl:w-[300px]">
                    <div className="pt-2 font-bold text-white">
                        {currentAuthState.user.firstName}{' '}
                        {currentAuthState.user.lastName}
                    </div>
                    <div className="border-b-2 border-white/25 pb-2">
                        {currentAuthState.user.userName}
                    </div>
                    <div className="border-b-2 border-primary-black py-2">
                        <label className="text-[12px] text-white font-bold">
                            LETTERS MEMBER SINCE
                        </label>
                        <br />
                        {currentAuthState.user.createdAt}
                    </div>
                    <div></div>
                    <div></div>
                </div>
            ) : null}
        </div>
    )
}
