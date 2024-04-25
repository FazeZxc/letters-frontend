import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { authState } from '../store/authState'

export const InputField = ({ socket }) => {
    const currentAuthState = useRecoilValue(authState)
    const [chatInput, setChatInput] = useState('')
    function chatHandler(event) {
        const { value } = event.target
        setChatInput(value)
    }

    function sendMessage(event) {
        event.preventDefault()
        console.log(currentAuthState.user)
        console.log('socket connected : ' + socket.connected)
        if (chatInput.trim() && currentAuthState.user) {
            socket.emit('message', {
                text: chatInput,
                name: currentAuthState.user.userName,
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
            })
        }
        setChatInput('')
    }
    const handleTyping = () =>
        socket.emit('typing', `${currentAuthState.user.userName} is typing`)
    return (
        <div>
            <form onSubmit={sendMessage}>
                <input
                    placeholder="Message"
                    type="text"
                    value={chatInput}
                    onChange={chatHandler}
                    onKeyDown={handleTyping}
                />
                <button onClick={sendMessage}>Send</button>
            </form>
        </div>
    )
}
