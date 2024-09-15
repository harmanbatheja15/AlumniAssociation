import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AlumniDirectory = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAlumnis = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`http://localhost:3000/api/user/users`, {
					withCredentials: true,
				});
				setUsers(response?.data?.users);
				setLoading(false);
				console.log('Users: ', response?.data?.users);
			} catch (err) {
				setError('Failed to load users.');
				setLoading(false);
				console.error(err);
			}
		};
		fetchAlumnis();
	}, []);

	return (
		<>
			<div className='container my-12 mx-auto px-4 md:px-12'>
				<div className='flex flex-wrap -mx-1 lg:-mx-4'>
					{loading ? (
						<div className='flex items-center justify-center min-h-[70vh] mx-auto'>
							<div className='relative'>
								<div className='w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200'></div>
								<div className='w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-500 border-t-transparent shadow-md'></div>
							</div>
						</div>
					) : error ? (
						<div className='text-center w-full'>
							<p className='text-xl text-red-500'>{error}</p>
						</div>
					) : users?.length === 0 ? (
						<div className='text-center w-full'>
							<p className='text-xl'>No users found!</p>
						</div>
					) : (
						<div className='flex flex-wrap -mx-1 lg:-mx-4 w-full'>
							{users.map((alumni) => (
								<div
									className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 flex items-center justify-center'
									key={alumni?.id}
								>
									<Link to='/'>
										<div className='flex flex-col overflow-hidden rounded-lg shadow-lg bg-white'>
											<img
												alt='Placeholder'
												className='block w-full h-[300px] object-cover'
												src={alumni?.image || `https://ui-avatars.com/api/?name=${alumni?.name}&background=ccc&color=fff`}
											/>
											<div className="p-4 space-y-3">
												<div className='flex flex-col flex-1'>
													<h1 className='text-lg font-semibold'>
														{alumni?.name}
													</h1>
												</div>
												<div className='flex flex-col flex-1 space-y-1'>
													<p className='text-grey-darker text-sm'>
														{alumni?.role}, {alumni?.student?.joiningYear} - {alumni?.student?.passingYear}
													</p>
													<p className='text-grey-darker text-sm'>
														{alumni?.student?.branch}
													</p>
												</div>
											</div>
										</div>
									</Link>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default AlumniDirectory;
