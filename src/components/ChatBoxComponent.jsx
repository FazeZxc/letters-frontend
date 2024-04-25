import { useRecoilValue } from 'recoil'
import { authState } from '../store/authState'

export const ChatBox = ({ messages, lastMessageRef, typingStatus }) => {
    const currentAuthState = useRecoilValue(authState)
    return (
        <div className="h-[600px] w-full flex px-4 flex-col gap-2 overflow-scroll overflow-x-hidden break-words text-wrap">
            {messages.map((message) =>
                message.name === currentAuthState.user.userName ? (
                    <div key={message.id}>
                        <p className="text-sm font-bold text-accent text-wrap">
                            You
                        </p>
                        <p className="px-4 rounded-none text-left bg-gray-900 w-full text-xl text-wrap">
                            {message.text}
                        </p>
                    </div>
                ) : (
                    <div key={message.id}>
                        <p className="text-sm font-bold text-primary-secondary">
                            {message.name}
                        </p>
                        <p className="px-4 rounded-none text-left bg-gray-900 w-full text-2xl">
                            {message.text}
                        </p>
                    </div>
                )
            )}
        </div>
    )
}
