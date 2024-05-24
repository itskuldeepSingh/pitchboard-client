import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStory } from '../store/pitchboardSlice';
import { icons } from './Icons';



import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001")



const AllStories = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on("newStory", (storyData) => {
            // console.log("Received updated stories from server:", storyData);
            dispatch(addStory(storyData));
        });

        return () => {
            socket.off("newStory");
        };
    }, [dispatch]);


    const storiesData = useSelector(state => state.pitchboard.allStories);
    console.log(storiesData)



    const handleEdit = (e, story_id) => {
        // this will open a modal box with clicked story details to make changes and save 
        const story = storiesData.find(story => story.storyId === story_id);
        console.log({
            id: story_id,
            story: story
        })

    }

    const handleDelete = (e, story_id) => {
        // this will delete the story from data base 
        console.log(story_id)
    }



    return (
        <div className='px-4'>
            <table className='table auto w-full'>
                <thead>
                    <tr className='text-sm text-left font-normal bg-pink-700 text-white'>
                        <th className='px-2 py-[0.1rem]'> DATE </th>
                        <th className='px-2'> HEADLINE </th>
                        <th className='px-2'> AUTHOR </th>
                        <th className='px-2'> STORY URL </th>
                        <th className='px-2'> BEATS </th>
                        <th className='px-2'> STATUS </th>
                        <th className='px-2 text-center'> ACTION </th>
                    </tr>
                </thead>
                <tbody>
                    {storiesData.map((ele, index) => (
                        <tr key={ele.story_id} className='text-sm text-left font-normal odd:bg-pink-50 even:bg-white'>
                            <td className='px-2'> {ele.pitched_at ? ele.pitched_at.split('T')[0] : ''} </td>
                            <td className='px-2'> {ele.story_headline} </td>
                            <td className='px-2'> {ele.author_name} </td>
                            <td className='px-2'> {ele.story_url} </td>
                            <td className='px-2'> {ele.beats} </td>
                            <td className='px-2'> {ele.story_status} </td>
                            {/* <td>
                                <select name="" className='outline-none w-full bg-transparent'>
                                    <option defaultValue="domestic" selected={ele.beats === "domestic"}>
                                        Domestic
                                    </option>
                                    <option defaultValue="international" selected={ele.beats === "international"}>
                                        International
                                    </option>
                                </select>
                            </td> */}
                            {/* <td className='px-2'>
                                <select name="" className='outline-none w-full bg-transparent'>
                                    <option defaultValue="pitched" selected={ele.storyStatus === 'pitched'}>
                                        Pitched
                                    </option>
                                    <option defaultValue="approve" selected={ele.storyStatus === 'approve'}>
                                        Approved
                                    </option>
                                    <option defaultValue="reject" selected={ele.storyStatus === 'reject'}>
                                        Rejected
                                    </option>
                                    <option defaultValue="onHold" selected={ele.storyStatus === 'onHold'}>
                                        On Hold
                                    </option>
                                </select>
                            </td> */}
                            <td className='px-2 text-center flex justify-center items-center gap-6 py-1'>
                                <button type='button' onClick={(e) => handleEdit(e, ele.storyId)} >
                                    {icons.pen('darkblue')}
                                </button>
                                <button type='button' onClick={(e) => handleDelete(e, ele.storyId)}>
                                    {icons.trash('darkred')}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllStories;
