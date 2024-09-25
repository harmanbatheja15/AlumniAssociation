import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '../store';
import { API } from '../../config';

const AlumniDirectory = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`${API}/user/users`, {
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
		fetchUsers();
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
							{users?.map((user) => (
								<div
									className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 flex items-center justify-center'
									key={user?.id}
								>
									<Link to={`/userDetail/${user?.id}`}>
										<div className='flex flex-col overflow-hidden rounded-lg shadow-lg bg-white'>
											<img
												alt='Placeholder'
												className='block w-full h-[300px] object-cover'
												src={user?.image || `https://ui-avatars.com/api/?name=${user?.name}&background=ccc&color=fff`}
											/>
											<div className="p-4 space-y-3">
												<div className='flex flex-col flex-1'>
													<h1 className='text-lg font-semibold'>
														{user?.name}
													</h1>
												</div>
												<div className='flex flex-col flex-1 space-y-1'>
													<p className='text-grey-darker text-sm'>
														{user && (user?.role === 'STUDENT' || user?.role === 'ALUMNI') && (
															user?.role + ', ' + user?.student?.joiningYear + ' - ' + user?.student?.passingYear
														)}
														{user && user?.role === 'FACULTY' && (
															user?.role + ', ' + user?.faculty?.joiningYear + ' - ' + user?.faculty?.leftYear
														)}
													</p>
													<p className='text-grey-darker text-sm'>
														{user?.student && user?.student?.branch}
														{user?.faculty && user?.faculty?.department}
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
