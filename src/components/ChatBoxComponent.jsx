import { useRecoilValue } from 'recoil'
import { authState } from '../store/authState'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../store/urls'
import { ProfileModal } from './profileModal'

export const ChatBox = ({ messages, lastMessageRef, typingStatus }) => {
    const currentAuthState = useRecoilValue(authState)
    const backendUrl = useRecoilValue(BACKEND_URL)
    const [name, setName] = useState('')
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post(`${backendUrl}/user`, {
                    userName: name,
                })
                console.log(response)
                setUserData({
                    username: response.data.userName,
                    joinedAt: response.data.updatedAt,
                })
            } catch (error) {
                console.log(error)
            }
        }

        if (name) {
            fetchData()
        }
    }, [backendUrl, name])
    const openProfileModal = (userName) => {
        setName(userName)
        document.getElementById('smallProfileModal').showModal()
    }

    return (
        <div className="h-[600px] xl:pb-[100px] w-full flex px-4 flex-col gap-2 overflow-scroll overflow-x-hidden break-words text-wrap">
            <ProfileModal userData={userData} />
            {messages.map((message) =>
                message.name === currentAuthState.user.userName ? (
                    <div key={message.id}>
                        <p
                            onClick={() => openProfileModal(message.name)}
                            className="text-sm font-bold text-accent text-wrap"
                        >
                            {message.name}
                        </p>
                        <p
                            ref={lastMessageRef}
                            className="px-4 rounded-none text-left bg-gray-900 w-full text-xl text-wrap"
                        >
                            {message.text}
                        </p>
                    </div>
                ) : (
                    <div key={message.id}>
                        <p
                            onClick={() => openProfileModal(message.name)}
                            className="text-sm font-bold text-primary-secondary"
                        >
                            {message.name}
                        </p>
                        <p className="px-4 rounded-none text-left bg-gray-900 w-full text-xl">
                            {message.text}
                        </p>
                    </div>
                )
            )}
        </div>
    )
}
