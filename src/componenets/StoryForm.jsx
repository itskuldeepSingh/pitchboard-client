import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { icons } from './Icons';
import { v4 as uuidv4 } from 'uuid';

// import io from 'socket.io-client';
// const socket = io.connect("http://localhost:3001");


function StoryForm() {

    const userData = useSelector(state => state.auth.userData);
    // const dispatch = useDispatch();
    const initialState = {
        story_headline: "",
        story_url: "",
        beats: "",
    };

    const [storyData, setStoryData] = useState(initialState);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uniqueId = uuidv4();
        const updatedStoryData = {
            ...storyData,
            story_id: uniqueId,
            pitched_at: new Date(),
            author_name: userData.first_name,
            story_status: "pitched"
        };

        try {
            const response = await fetch("http://localhost:3001/api/users/storypitched", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedStoryData)
            });

            if (response.ok) {
                // console.log('Story has been stored successfully');
                setStoryData(initialState);
            }
            else {
                console.error('Server response not OK');
            }
        }
        catch (err) {
            console.error('Error:', err);
        }
    };

    const handleStoriesData = (e) => {
        const { name, value } = e.target;
        setStoryData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='w-full py-4 px-4 flex flex-row items-center gap-1'
        >
            <input
                type='text'
                placeholder='Headline'
                name='story_headline'
                value={storyData.story_headline}
                onChange={handleStoriesData}
                className='outline-none w-[35%] border border-blue-100 bg-blue-100 rounded-md py-[0.1rem] px-2 font-semibold text-blue-900'
            />

            <input
                type='text'
                placeholder='Story URL'
                name='story_url'
                value={storyData.story_url}
                onChange={handleStoriesData}
                className='outline-none w-[25%] border border-blue-100 bg-blue-100 rounded-md py-[0.1rem] px-2 font-semibold text-blue-900'
            />

            <select
                name='beats'
                value={storyData.beats}
                onChange={handleStoriesData}
                className='outline-none w-[20%] border border-blue-100 bg-blue-100 rounded-md py-[0.1rem] px-2 font-semibold text-blue-900'
            >
                <option value=''>Select Beat</option>
                <option value='domestic'>Domestic</option>
                <option value='international'>International</option>
            </select>

            <div className='w-[20%] flex flex-row items-center gap-1 justify-center'>
                <button type='submit' className='py-[0.2rem] px-4 bg-pink-800 rounded-md text-white flex items-center gap-4 border-pink-800' >
                    {icons.pen('white')}
                    Pitch
                </button>
                <button onClick={() => setStoryData(initialState)} type='button' className='py-[0.2rem] px-4 bg-slate-700 rounded-md text-white flex items-center gap-4 border-none outline-none'>
                    {icons.trash('white')}
                    Clear
                </button>
            </div>
        </form>
    );
}

export default StoryForm;
