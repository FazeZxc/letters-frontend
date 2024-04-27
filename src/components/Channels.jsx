import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { BACKEND_URL } from '../store/urls'
import { authState } from '../store/authState'

export const Channels = () => {
    const backendUrl = useRecoilValue(BACKEND_URL)
    const [channels, setChannels] = useState([])
    const currentAuthState = useRecoilValue(authState)
    useEffect(() => {
        async function fetchChannels() {
            if(currentAuthState?.user){
                try {
                    const response = await axios.post(backendUrl + '/channel' , {
                        userName: currentAuthState.user.userName
                    })
                    if (response.data) {
                        setChannels(response.data)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchChannels()
    }, [currentAuthState])

    return (
        <div>
            <ul className="menu bg-base-200 w-56 p-0 [&_li>*]:rounded-none">
                {channels.map((channel, index) => {
                    return (
                        <div key={index}>
                            <li>
                                <a>{channel.channelId}</a>
                            </li>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}
