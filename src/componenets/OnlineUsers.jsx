import React from 'react'
import { useSelector } from 'react-redux'

const OnlineUsers = () => {
    const allUsers = useSelector(state => state.auth.onlineUsers || []);
    return (
        <div className="flex justify-end gap-1 h-full w-[50%]">

            {allUsers.map((user, index) => (
                <div key={index} className='w-6 h-full overflow-hidden border rounded-[50%] border-red-800'>
                    <img className='rounded-[50%]' src={user.profile_img} />
                </div>
            ))}
        </div>
    )
}

export default OnlineUsers