import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { authState } from '../store/authState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import EmojiPicker from 'emoji-picker-react'

export const InputField = ({ socket, lastMessageRef, typingStatus }) => {
    const currentAuthState = useRecoilValue(authState)
    const [chatInput, setChatInput] = useState('')
    const [isEmojiOpened, setIsEmojiOpened] = useState(false)

    function chatHandler(event) {
        const { value } = event.target
        setChatInput(value)
    }

    function emojiClickHandler(emoji) {
        setChatInput((prev) => prev + emoji.emoji)
    }

    function sendMessage(event) {
        event.preventDefault()
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
        <div className="xl:absolute">
            <div className="absolute top-0 xl:translate-y-[-100%] translate-y-[35%]">
                <EmojiPicker
                    open={isEmojiOpened}
                    onEmojiClick={emojiClickHandler}
                />
            </div>
            <form onSubmit={sendMessage} className="form-control">
                <div className="bg-transparent" ref={lastMessageRef} />
                <div className="p-2 bg-transparent text-white">
                    <p>{typingStatus}</p>
                </div>
                <div className="relative w-screen h-14 flex items-center gap-4 justify-between bg-white px-4  border-gray-600">
                    <div className="flex items-center justify-center font-sans ">
                        <label
                            htmlFor="file"
                            className="cursor-pointer flex items-center justify-center relative"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 337 337"
                                className="h-6"
                            >
                                <circle
                                    strokeWidth="20"
                                    stroke="#6c6c6c"
                                    fill="none"
                                    r="158.5"
                                    cy="168.5"
                                    cx="168.5"
                                ></circle>
                                <path
                                    strokeLinecap="round"
                                    strokeWidth="25"
                                    stroke="#6c6c6c"
                                    d="M167.759 79V259"
                                ></path>
                                <path
                                    strokeLinecap="round"
                                    strokeWidth="25"
                                    stroke="#6c6c6c"
                                    d="M79 167.138H259"
                                ></path>
                            </svg>
                            <span className="absolute top-0 -mt-10 bg-black text-white text-xs px-2 py-1 border border-gray-600 rounded opacity-0 transition duration-300">
                                Add an image
                            </span>
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            className="hidden"
                        />
                    </div>
                    <input
                        placeholder="Message"
                        type="text"
                        value={chatInput}
                        onChange={chatHandler}
                        onKeyDown={handleTyping}
                        className="w-[480px] xl:grow h-full bg-transparent outline-none border-none pl-4 text-black"
                    />

                    <FontAwesomeIcon
                        onClick={() => {
                            if (!isEmojiOpened) {
                                setIsEmojiOpened(true)
                            } else {
                                setIsEmojiOpened(false)
                            }
                        }}
                        className="cursor-pointer"
                        icon={faFaceSmile}
                    />

                    <button
                        id="sendButton"
                        className="flex items-center justify-center cursor-pointer transition duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 664 663"
                            className="h-6"
                        >
                            <path
                                fill="none"
                                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                            ></path>
                            <path
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="33.67"
                                stroke="#6c6c6c"
                                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                            ></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}
