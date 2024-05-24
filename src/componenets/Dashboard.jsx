import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StoryForm from './StoryForm';
import OnlineUsers from './OnlineUsers';
import AllStories from './AllStories';


import io from 'socket.io-client';
const socket = io.connect("https://pitchboard-server.onrender.com/") // backend end point


const Dashboard = () => {
    const isLogin = useSelector(state => state.auth.status);

    // const currentUser = useSelector(state => state.auth.userData);
    // const onlineUsersList = useSelector(state => state.auth.onlineUsers);
    // console.log({
    //     isLogin: isLogin,
    //     currentUser: currentUser
    // })

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigate('/');
        }

        return () => {
            socket.off("newUser"); // Clean up event listener on unmount
        };
    }, [isLogin, navigate]);

    return (
        <div className='w-screen h-screen bg-blue-950 flex flex-col items-center gap-2'>
            <div className='w-full h-[10%] py-4 px-6 flex flex-row items-center justify-between'>
                <div>
                    <p className='text-xl text-white font-semibold'>Welcome Back, <span className='text-pink-700 font-bold'>Kuldeep</span> </p>
                </div>
                <OnlineUsers />
            </div>
            <div className='w-[96%] h-[80%] bg-white rounded-md  '>
                <StoryForm />
                <AllStories />
            </div>
        </div>
    );
};

export default Dashboard;
