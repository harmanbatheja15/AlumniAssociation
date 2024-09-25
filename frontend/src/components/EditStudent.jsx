import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../store';
import { API } from '../../config';

const EditStudent = ({ setEditStudentOpen }) => {
    const { user, updateUser } = useStore();
    const [loading, setLoading] = useState(false);
    const [studentData, setStudentData] = useState({
        course: '',
        branch: '',
        joiningYear: '',
        passingYear: '',
        rollNo: '',
    });

    useEffect(() => {
        if (user?.student) {
            setStudentData({
                course: user?.student?.course,
                branch: user?.student?.branch,
                joiningYear: user?.student?.joiningYear,
                passingYear: user?.student?.passingYear,
                rollNo: user?.student?.rollNo,
            });
        }
    }, [user?.student]);

    const handleInputChange = (e) => {
        setStudentData({
            ...studentData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        try {
            setLoading(true);

            // Send updated student data to the backend
            const response = await axios.put(
                `${API}/user/student`,
                studentData,
                { withCredentials: true }
            );

            console.log('Student details updated successfully!', response?.data);

            updateUser({ ...user, student: response.data });
            setEditStudentOpen(false);
        } catch (error) {
            console.error('Error while updating student details!', error);
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
                                            Edit Student Details
                                        </h3>
                                        <div className='mt-2 text-start space-y-1 mb-4'>
                                            <label htmlFor='institute'>Institute</label>
                                            <input
                                                type='text'
                                                name='institute'
                                                id='institute'
                                                className='w-full border rounded-lg p-2'
                                                value={studentData?.institute || 'Thapar Polytechnic College'}
												disabled
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='mt-2 text-start space-y-1 mb-4'>
                                            <label htmlFor='course'>Course</label>
                                            <input
                                                type='text'
                                                name='course'
                                                id='course'
                                                className='w-full border rounded-lg p-2'
                                                value={studentData.course}
												disabled
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='mt-2 text-start space-y-1 mb-4'>
                                            <label htmlFor='branch'>Branch</label>
                                            <select
                                                name='branch'
                                                id='branch'
                                                className='w-full border rounded-lg p-2'
                                                value={studentData.branch}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value='' disabled>Select</option>
                                                <option value='COMPUTER_SCIENCE'>Computer Science Engineering</option>
                                                <option value='MECHANICAL'>Mechanical Engineering</option>
                                                <option value='ARCHITECTURAL'>Architectural Engineering</option>
                                                <option value='CIVIL'>Civil Engineering</option>
                                                <option value='ELECTRICAL'>Electrical Engineering</option>
                                            </select>
                                        </div>
                                        <div className='mt-2 text-start space-y-1 mb-4'>
                                            <label htmlFor='joiningYear'>Joining Year</label>
                                            <input
                                                type='number'
                                                name='joiningYear'
                                                id='joiningYear'
                                                className='w-full border rounded-lg p-2'
                                                value={studentData.joiningYear}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='mt-2 text-start space-y-1 mb-4'>
                                            <label htmlFor='passingYear'>Passing Year</label>
                                            <input
                                                type='number'
                                                name='passingYear'
                                                id='passingYear'
                                                className='w-full border rounded-lg p-2'
                                                value={studentData.passingYear}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='mt-2 text-start space-y-1 mb-4'>
                                            <label htmlFor='rollNo'>Roll Number</label>
                                            <input
                                                type='text'
                                                name='rollNo'
                                                id='rollNo'
                                                className='w-full border rounded-lg p-2'
                                                value={studentData.rollNo}
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
                                    onClick={() => setEditStudentOpen(false)}
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

export default EditStudent;