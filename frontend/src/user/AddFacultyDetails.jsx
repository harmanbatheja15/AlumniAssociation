import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import { API } from '../../config';

const AddFacultyDetails = () => {
	const navigate = useNavigate();
	const [jobTitle, setJobTitle] = useState('');
	const [department, setDepartment] = useState();
	const [joiningYear, setJoiningYear] = useState('');
	const [leftYear, setLeftYear] = useState();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formattedJoiningYear = parseInt(joiningYear, 10);
		setLoading(true);
		await axios
			.post(
				'http://localhost:3000/api/user/faculty',
				{
					jobTitle,
					department,
					joiningYear: formattedJoiningYear,
					leftYear,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				alert('Details added successfully!');
				setLoading(false);
				navigate('/profile');
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	return (
		<>
			<section>
				<div className='flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
					<div className='xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md'>
						<div className='mb-2 flex justify-center'>
							<svg
								width='50'
								height='56'
								viewBox='0 0 50 56'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z'
									fill='black'
								/>
							</svg>
						</div>
						<h2 className='text-center text-2xl font-bold leading-tight text-black'>
							Add Faculty Details
						</h2>
						<form
							action='#'
							method='POST'
							onSubmit={handleSubmit}
							className='mt-8'
						>
							<div className='space-y-5'>
								<div>
									<label
										htmlFor='jobTitle'
										className='text-base font-medium text-gray-900'
									>
										Job Title
									</label>
									<div className='mt-2'>
										<input
											className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
											type='text'
											placeholder=''
											id='jobTitle'
											value={jobTitle}
											onChange={(e) => setJobTitle(e.target.value)}
										/>
									</div>
								</div>
								<div>
									<label
										htmlFor='department'
										className='text-base font-medium text-gray-900'
									>
										Department
									</label>
									<div className='mt-2'>
										<select
											className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
											id='department'
											defaultValue={'Select'}
											onChange={(e) => setDepartment(e.target.value)}
										>
											<option value='Select' disabled>Select</option>
											<option value='COMPUTER_SCIENCE'>Computer Science Engineering</option>
											<option value='MECHANICAL'>Mechanical Engineering</option>
											<option value='CIVIL'>Civil Engineering</option>
											<option value='ELECTRICAL'>Electrical Engineering</option>
											<option value='ARCHITECTURAL'>Architectural Engineering</option>
										</select>
									</div>
								</div>
								<div>
									<div className='flex items-center justify-between'>
										<label
											htmlFor='joiningYear'
											className='text-base font-medium text-gray-900'
										>
											Joining Year
										</label>
									</div>
									<div className='mt-2'>
										<input
											className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
											type='number'
											placeholder=''
											id='joiningYear'
											required
											value={joiningYear}
											onChange={(e) => setJoiningYear(e.target.value)}
										></input>
									</div>
								</div>
								<div>
									<div className='flex items-center justify-between'>
										<label
											htmlFor='leftYear'
											className='text-base font-medium text-gray-900'
										>
											Left Year
										</label>
									</div>
									<div className='mt-2'>
										<input
											className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
											type='text'
											placeholder=''
											id='leftYear'
											required
											value={leftYear}
											onChange={(e) => setLeftYear(e.target.value)}
										></input>
										<small className='text-gray-500'>Type <b>Continuing</b> if still working</small>
									</div>
								</div>
								<div>
									<button
										type='submit'
										className='inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80'
									>
										{loading ? (
											<div className="w-7 h-7 rounded-full animate-spin border-4 border-solid border-blue-500 border-t-transparent shadow-md"></div>
										) : (
											<>
												Submit{' '}
												<ArrowRight
													className='ml-2'
													size={16}
												/>
											</>
										)}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default AddFacultyDetails;
