import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../store';
import { API } from '../../config';

const EditInformation = ({ setEditInformationOpen }) => {
    const { user, updateUser } = useStore();
    const [information, setInformation] = useState(user?.profile || {});
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setInformation(user?.profile || {});
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        try {
            setLoading(true);
            setErrorMessage('');
            const response = await axios.put(
                'http://localhost:3000/api/user/profile',
                {
                    gender: information?.gender,
                    maritalStatus: information?.maritalStatus,
                    location: information?.location,
                    dob: information?.dob,
                    about: information?.about || '',
                },
                { withCredentials: true }
            );

            console.log('information updated successfully!', response?.data);
            updateUser({ ...user, profile: response.data });
            setEditInformationOpen(false);
        } catch (error) {
            console.error('Error while updating information!', error);
            setErrorMessage('Failed to update information. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='relative z-10'>
            <div className='fixed z-10 inset-0 overflow-y-auto backdrop-blur-md'>
                <div className='flex items-end md:items-center justify-center min-h-full p-4 text-center md:p-0'>
                    <div className='relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all md:my-8 md:max-w-lg w-screen'>
                        <div className='bg-white p-4 md:p-6 md:pb-4'>
                            <div className='md:flex md:items-start'>
                                <div className='w-full mt-3 text-center md:mt-0 md:text-left'>
                                    <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4' id='modal-title'>
                                        Edit Information
                                    </h3>
                                    {errorMessage && (
                                        <div className="text-red-500 mb-4">{errorMessage}</div>
                                    )}
                                    <div className='mt-2 text-start space-y-1 mb-4'>
                                        <label htmlFor="gender">Gender</label>
                                        <select
                                            id="gender"
                                            className='w-full border rounded-lg p-2'
                                            value={information?.gender || 'Select'}
                                            onChange={(e) => setInformation({ ...information, gender: e.target.value })}
                                        >
                                            <option value='Select' disabled>Select</option>
                                            <option value='MALE'>Male</option>
                                            <option value='FEMALE'>Female</option>
                                            <option value='NOT_SPECIFIED'>Not Specified</option>
                                        </select>
                                    </div>
                                    <div className='mt-2 text-start space-y-1 mb-4'>
                                        <label htmlFor="maritalStatus">Marital Status</label>
                                        <select
                                            id="maritalStatus"
                                            className='w-full border rounded-lg p-2'
                                            value={information?.maritalStatus || 'Select'}
                                            onChange={(e) => setInformation({ ...information, maritalStatus: e.target.value })}
                                        >
                                            <option value='Select' disabled>Select</option>
                                            <option value='SINGLE'>Single</option>
                                            <option value='MARRIED'>Married</option>
                                            <option value='NOT_SPECIFIED'>Not Specified</option>
                                        </select>
                                    </div>
                                    <div className='mt-2 text-start space-y-1 mb-4'>
                                        <label htmlFor="location">Location</label>
                                        <input
                                            id="location"
                                            type='text'
                                            className='w-full border rounded-lg p-2'
                                            value={information?.location || ''}
                                            onChange={(e) => setInformation({ ...information, location: e.target.value })}
                                        />
                                    </div>
                                    <div className='mt-2 text-start space-y-1 mb-4'>
                                        <label htmlFor="dateOfBirth">Date of Birth</label>
                                        <input
                                            id="dateOfBirth"
                                            type='date'
                                            className='w-full border rounded-lg p-2'
                                            value={information?.dob ? information.dob.split('T')[0] : ''}
                                            onChange={(e) => setInformation({ ...information, dob: e.target.value+'T00:00:00.000Z' })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-50 px-4 py-3 md:px-6 md:flex md:flex-row-reverse'>
                            <button
                                type='button'
                                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:ml-3 md:w-auto md:text-sm'
                                onClick={handleSubmit}
                            >
                                {loading ? (
                                    <div className="w-4 h-4 rounded-full animate-spin border-4 border-solid border-blue-500 border-t-transparent shadow-md"></div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                            <button
                                type='button'
                                className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:mt-0 md:ml-3 md:w-auto md:text-sm'
                                onClick={() => setEditInformationOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditInformation;