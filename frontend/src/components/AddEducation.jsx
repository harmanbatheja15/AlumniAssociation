import { useState } from 'react';
import axios from 'axios';
import { useStore } from '../store';

const AddEducation = ({ setAddEducationOpen }) => {
    const { user, updateUser } = useStore();
    const [loading, setLoading] = useState(false);
    const [education, setEducation] = useState({
        institute: '',
        degree: '',
        branch: '',
        joiningYear: '',
        passingYear: '',
    });

    const handleInputChange = (e) => {
        setEducation({
            ...education,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
		e.preventDefault();
		if (loading) return;
	
		// Validate that joiningYear and passingYear are valid numbers
		if (!education.joiningYear || !education.passingYear) {
			console.error('Joining Year and Passing Year are required.');
			return;
		}
	
		const joiningYear = parseInt(education.joiningYear, 10);
		const passingYear = parseInt(education.passingYear, 10);
	
		if (isNaN(joiningYear) || isNaN(passingYear)) {
			console.error('Joining Year and Passing Year must be valid numbers.');
			return;
		}
	
		try {
			setLoading(true);
			
			const educationData = {
				...education,
				joiningYear,
				passingYear,
			};
	
			const response = await axios.post(
				'http://localhost:3000/api/user/education',
				educationData,
				{ withCredentials: true }
			);
	
			console.log('Education added successfully!', response?.data);
			updateUser({ ...user, education: [...user.education, response.data] });
			setAddEducationOpen(false);
		} catch (error) {
			console.error('Error while adding education!', error);
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
                                            Add Education
                                        </h3>
                                        <div className='mt-2 text-start space-y-1 mb-4'>
                                            <label htmlFor='institute'>Institute</label>
                                            <input
                                                type='text'
                                                id='institute'
                                                name='institute'
                                                className='w-full border rounded-lg p-2'
                                                value={education.institute}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='mt-2 text-start space-y-1 mb-4'>
                                            <label htmlFor='degree'>Degree</label>
                                            <input
                                                type='text'
                                                id='degree'
                                                name='degree'
                                                className='w-full border rounded-lg p-2'
                                                value={education.degree}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='mt-2 text-start space-y-1 mb-4'>
                                            <label htmlFor='branch'>Branch</label>
                                            <input
                                                type='text'
                                                id='branch'
                                                name='branch'
                                                className='w-full border rounded-lg p-2'
                                                value={education.branch}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='mt-2 text-start space-y-1 mb-4'>
                                            <label htmlFor='joiningYear'>Joining Year</label>
                                            <input
                                                type='number'
                                                id='joiningYear'
                                                name='joiningYear'
                                                className='w-full border rounded-lg p-2'
                                                value={education.joiningYear}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='mt-2 text-start space-y-1 mb-4'>
                                            <label htmlFor='passingYear'>Passing Year</label>
                                            <input
                                                type='number'
                                                id='passingYear'
                                                name='passingYear'
                                                className='w-full border rounded-lg p-2'
                                                value={education.passingYear}
                                                onChange={handleInputChange}
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
                                        <div className='w-4 h-4 rounded-full animate-spin border-4 border-solid border-blue-500 border-t-transparent shadow-md'></div>
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                                <button
                                    type='button'
                                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:mt-0 md:ml-3 md:w-auto md:text-sm'
                                    onClick={() => setAddEducationOpen(false)}
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

export default AddEducation;