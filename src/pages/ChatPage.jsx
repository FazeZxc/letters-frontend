import { useEffect, useRef, useState } from 'react'
import { ChatBox } from '../components/ChatBoxComponent'
import { InputField } from '../components/InputField'
import { OnlineUsers } from '../components/OnlineUsers'
import { SettingsMenu } from '../components/settingsMenu'

export const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([])
    const [typingStatus, setTypingStatus] = useState('')
    const lastMessageRef = useRef(null)
    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]))
    }, [socket, messages])

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        socket.on('typingResponse', (data) => setTypingStatus(data))
    }, [socket])
    console.log(messages);
    return (
        <div className="flex flex-row">
            <div className="drawer drawer-end">
                <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    <div className="flex flex-col justify-end">
                        <SettingsMenu />
                        
                        <ChatBox
                            messages={messages}
                            lastMessageRef={lastMessageRef}
                            typingStatus={typingStatus}
                        />
                        <InputField
                            socket={socket}
                            typingStatus={typingStatus}
                        />
                    </div>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li>
                            <OnlineUsers socket={socket} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
