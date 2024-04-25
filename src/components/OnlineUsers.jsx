import { useEffect, useState } from 'react'

export const OnlineUsers = ({ socket }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        socket.on('newUserResponse', (data) => setUsers(data))
    }, [socket, users])

    return (
        <div className="flex flex-col w-full items-start gap-4">
            <h4 className="font-bold text-white text-[12px]">ACTIVE USERS</h4>
            <div className=" text-xl py-2 flex flex-col gap-2">
                {users.map((user) => (
                    <p className="chat-bubble rounded-lg" key={user.socketID}>
                        {user.userName}
                    </p>
                ))}
            </div>
        </div>
    )
}
