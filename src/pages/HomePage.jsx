import { useRecoilValue } from 'recoil'
import { authState } from '../store/authState'
import { useNavigate } from 'react-router-dom'
import { HomePageNavbar } from '../components/homePageNavbar'

export const HomePage = () => {
    const currentAuthState = useRecoilValue(authState)
    const navigate = useNavigate()
    function clickHandler() {
        if (currentAuthState) {
            navigate('/app')
        } else {
            navigate('/auth/login')
        }
    }
    return (
        <div className="bg-white h-screen w-screen bg-homepage bg-contain bg-no-repeat bg-right">
            <HomePageNavbar />
            <div className="xl:ml-8 flex flex-col gap-3 items-center xl:place-items-start place-content-between mt-24 xl:mt-32 xl:w-[600px] h-[400px] xl:h-[200px]">
                <div>
                    <p className="text-6xl text-center font-extrabold bg-gradient-to-r from-blue-600 to-fuchsia-400 bg-clip-text text-transparent">
                        REAL TIME CHAT
                    </p>
                    <p className="hidden lg:flex pl-2 text-xl text-pretty text-left w-[500px] text-black font-mono">
                        With "Letters," every message carries the personal touch
                        of a handwritten note, allowing users to express
                        themselves in a more intimate and meaningful way.{' '}
                    </p>
                </div>
                <button
                    onClick={clickHandler}
                    className="bg-primary-black rounded-3xl font-bold px-4 py-2 hover:shadow-lg shadow-black hover:bg-gradient-to-r hover:from-blue-600 hover:to-fuchsia-400 hover:bg-clip-text hover:text-transparent hover:backdrop-invert "
                >
                    Open Letters in your browser
                </button>
            </div>
        </div>
    )
}
