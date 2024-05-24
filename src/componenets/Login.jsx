import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as userLogin, updateOnlineUsers } from '../store/authSlice'; // Import setStories action
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { setStories } from '../store/pitchboardSlice';
const socket = io.connect("http://localhost:3001"); // backend end point



function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const fetchStories = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/users/getallstory");
            if (response.ok) {
                const stories = await response.json();
                console.log(stories);
                dispatch(setStories(stories)); // Dispatch action to set stories in the Redux store
            } else {
                console.error("Failed to fetch stories");
            }
        } catch (error) {
            console.error("Error fetching stories:", error);
        }
    };

    const handleLogin = () => {
        try {
            fetch("http://localhost:3001/api/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            }).then(async response => {
                if (response.ok) {
                    const data = await response.json();
                    socket.emit('login', data.userData);
                    dispatch(userLogin(data.userData));

                    socket.on("newUser", (newUser) => {
                        dispatch(updateOnlineUsers(newUser));
                    });

                    await fetchStories(); // Fetch stories after successful login
                    navigate('/dashboard');
                } else {
                    alert('invalid credentials');
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='relative w-screen h-screen bg-pink-700 flex items-center justify-center'>
            <div className='w-[760px] h-[440px] max-md:w-[370px] bg-white border shadow-lg rounded-md flex overflow-hidden'>
                <div className='h-full w-2/4 flex items-center justify-center max-md:hidden'>
                </div>
                <div className='h-full w-2/4 flex flex-col items-center justify-center gap-10 max-md:w-full px-4'>
                    <div>
                        <p className='text-center text-zinc-950'>Editorial Management System</p>
                    </div>
                    <div className='w-full text-center flex flex-col justify-center gap-3 px-4 py-3'>
                        <input
                            type="email"
                            name="email"
                            onChange={handleInput}
                            value={user.email}
                            placeholder='user@medianama.com'
                            className='border rounded-md py-1 px-2 outline-none' />
                        <input
                            type="password"
                            name="password"
                            placeholder='password'
                            onChange={handleInput}
                            value={user.password}
                            className='border rounded-md py-1 px-2 outline-none' />

                        <button
                            onClick={handleLogin}
                            className='py-1 px-2 flex flex-row items-center gap-4 justify-center bg-pink-700
                            rounded-md text-white hover:bg-pink-900 mt-4'>
                            <span>
                                Login
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <p className='absolute bottom-4 text-white text-sm'> Copyrights © 2024, MEDIANAMA</p>
        </div>
    );
}

export default Login;
