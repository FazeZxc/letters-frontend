import { useEffect, useRef, useState } from 'react'
import { ChatBox } from '../components/ChatBoxComponent'
import { InputField } from '../components/InputField'
import { OnlineUsers } from '../components/OnlineUsers'

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
    return (
        <div>
            <OnlineUsers socket={socket} />
            <ChatBox messages={messages} lastMessageRef={lastMessageRef} typingStatus={typingStatus} />
            <InputField socket={socket} />
        </div>
    )
}
