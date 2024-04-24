import { useEffect, useState } from 'react'

export const OnlineUsers = ({ socket }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        socket.on('newUserResponse', (data) => setUsers(data))
    }, [socket, users])

    return (
        <div>
            <h2>Open Chat</h2>
            <div>
                <h4>ACTIVE USERS</h4>
                <div>
                    {users.map((user) => (
                        <p key={user.socketID}>{user.userName}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}
