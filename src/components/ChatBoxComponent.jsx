import { useRecoilValue } from 'recoil'
import { authState } from '../store/authState'

export const ChatBox = ({ messages, lastMessageRef, typingStatus }) => {
    const currentAuthState = useRecoilValue(authState)
    return (
        <div>
            {messages.map((message) =>
                message.name === currentAuthState.user.userName ? (
                    <div key={message.id}>
                        <p>You</p>
                        <p>{message.text}</p>
                    </div>
                ) : (
                    <div key={message.id}>
                        <p>{message.name}</p>
                        <div>
                            <p>{message.text}</p>
                        </div>
                    </div>
                )
            )}
            <div ref={lastMessageRef} />
            <div>
                <p>{typingStatus}</p>
            </div>
        </div>
    )
}
