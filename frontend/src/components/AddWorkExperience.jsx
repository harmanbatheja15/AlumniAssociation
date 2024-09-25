import { useState } from 'react';
import axios from 'axios';
import { useStore } from '../store';
import { API } from '../../config';

const AddWorkExperience = ({ setAddWorkExperienceOpen }) => {
    const { user, updateUser } = useStore();
    const [loading, setLoading] = useState(false);
    const [workExperience, setWorkExperience] = useState({
        jobTitle: '',
        company: '',
        joiningYear: '',
        leftYear: '',
    });

    const handleInputChange = (e) => {
        setWorkExperience({
            ...workExperience,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        try {
            setLoading(true);

            // Send new work experience data to the backend
            const response = await axios.post(
                'http://localhost:3000/api/user/workExperience',
                {
                    ...workExperience,
                    userId: user.id, // Assuming you want to associate it with the current user
                },
                { withCredentials: true }
            );

            console.log('Work experience added successfully!', response?.data);

            // Update user state in the store
            updateUser({ ...user, workExperience: [...user.workExperience, response.data] });
            setAddWorkExperienceOpen(false);
        } catch (error) {
            console.error('Error while adding work experience!', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='relative z-10'>
                <div className='fixed z-10 inset-0 overflow-y-auto backdrop-blur-md'>
                    <div className='flex items-end md:items-center justify-center min-h-full p-4 text-center md:p-0'>
                        <div className='relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all md:my-8 md:max-w-lg w-screen'>
                            <div className='bg-white p-4 md:p-6 md:pb-4'>
                                <div className='md:flex md:items-start'>
                                    <div className='w-full mt-3 text-center md:mt-0 md:text-left'>
                                        <h3
                                            className='text-lg leading-6 font-medium text-gray-900 mb-4'
                                            id='modal-title'
                                        >
                                            Add Work Experience
                                        </h3>
                                        <div className='mt-2 text-start space-y-1 mb-4'>
                                            <label htmlFor='jobTitle'>Job Title</label>
                                            <input
                                                type='text'
                                                name='jobTitle'
                                                id='jobTitle'
                                                className='w-full border rounded-lg p-2'
                                                value={workExperience.jobTitle}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className='mt-2 text-start space-y-1 mb-4'>
                                            <label htmlFor='company'>Company</label>
                                            <input
                                                type='text'
                                                name='company'
                                                id='company'
                                                className='w-full border rounded-lg p-2'
                                                value={workExperience.company}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className='mt-2 text-start space-y-1 mb-4'>
                                            <label htmlFor='joiningYear'>Joining Year</label>
                                            <input
                                                type='number'
                                                name='joiningYear'
                                                id='joiningYear'
                                                className='w-full border rounded-lg p-2'
                                                value={workExperience.joiningYear}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className='mt-2 text-start space-y-1 mb-4'>
                                            <label htmlFor='leftYear'>Left Year</label>
                                            <input
                                                type='text'
                                                name='leftYear'
                                                id='leftYear'
                                                className='w-full border rounded-lg p-2'
                                                value={workExperience.leftYear}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-gray-50 px-4 py-3 md:px-6 md:flex md:flex-row-reverse'>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:ml-3 md:w-auto md:text-sm"
                                    onClick={handleSubmit}
                                >
                                    {loading ? (
                                        <div className="w-4 h-4 rounded-full animate-spin border-4 border-solid border-blue-500 border-t-transparent shadow-md"></div>
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:mt-0 md:ml-3 md:w-auto md:text-sm"
                                    onClick={() => setAddWorkExperienceOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddWorkExperience;