import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../store';

const EditEducation = ({ setEditEducationOpen }) => {
	const { user } = useStore();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
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
											Edit Education Details
										</h3>
										<div className='mt-2 text-start space-y-1 mb-4'>
											<label htmlFor=''>Institute</label>
											<input
												type='text'
												className='w-full border rounded-lg p-2'
												placeholder=''
											/>
										</div>
										<div className='mt-2 text-start space-y-1 mb-4'>
											<label htmlFor=''>Degree</label>
											<input
												type='text'
												className='w-full border rounded-lg p-2'
												placeholder=''
											/>
										</div>
										<div className='mt-2 text-start space-y-1 mb-4'>
											<label htmlFor=''>Branch</label>
											<input
												type='text'
												className='w-full border rounded-lg p-2'
												placeholder=''
											/>
										</div>
										<div className='mt-2 text-start space-y-1 mb-4'>
											<label htmlFor=''>
												Joining Year
											</label>
											<input
												type='number'
												className='w-full border rounded-lg p-2'
												placeholder=''
											/>
										</div>
										<div className='mt-2 text-start space-y-1 mb-4'>
											<label htmlFor=''>
												Passing Year
											</label>
											<input
												type='number'
												className='w-full border rounded-lg p-2'
												placeholder=''
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
									onClick={() => setEditEducationOpen(false)}
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

export default EditEducation;
