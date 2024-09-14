import { useState, useEffect } from 'react';
import axios from 'axios';

const AddAboutMe = ({ addAboutMeOpen, setAddAboutMeOpen }) => {
	const [aboutMe, setAboutMe] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		try {
			axios
				.get('http://localhost:3000/api/user/information', {
					withCredentials: true,
				})
				.then((response) => {
					const profile = response?.data?.user?.profile;
					setAboutMe(profile?.about);
				});
		} catch (error) {
			console.log('Profile fetch failed! ', error);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			await axios.put(
				'http://localhost:3000/api/user/profile',
				{
					about: aboutMe,
				},
				{
					withCredentials: true,
				}
			);
			setLoading(false);
			setAddAboutMeOpen(false);
		} catch (error) {
			console.error('Error while signing up! ', error);
			alert('Invalid credentials!');
			setLoading(false);
		}
	};

	return (
		<>
			<div className='relative z-10'>
				<div className='fixed z-10 inset-0 overflow-y-auto backdrop-blur-md'>
					<div className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
						<div className='relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full'>
							<div className='bg-white p-4 sm:p-6 sm:pb-4'>
								<div className='sm:flex sm:items-start'>
									<div className='w-full mt-3 text-center sm:mt-0 sm:text-left'>
										<h3
											className='text-lg leading-6 font-medium text-gray-900'
											id='modal-title'
										>
											About Me
										</h3>
										<div className='mt-2'>
											<textarea
												rows={4}
												className='w-full border rounded-lg p-2'
												placeholder='About Me...'
												value={aboutMe}
												onChange={(e) =>
													setAboutMe(e.target.value)
												}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
								<button
									type='button'
									className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
									onClick={handleSubmit}
								>
									Submit
								</button>
								<button
									type='button'
									className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
									onClick={() => setAddAboutMeOpen(false)}
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

export default AddAboutMe;
