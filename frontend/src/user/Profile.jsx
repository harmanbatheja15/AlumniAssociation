import { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from 'react-avatar';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Profile = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		try {
			axios
				.get('http://localhost:3000/api/user/profile', {
					withCredentials: true,
				})
				.then((response) => {
					const { user } = response.data;
					setUser(user);
				});
		} catch (error) {
			console.log('Profile fetch failed! ', error);
		}
	}, []);

	if (!user) {
		return (
			<>
				<div className='absolute top-1/2 left-1/2 -mt-4 -ml-2 h-8 w-4 text-indigo-700'>
					<div className='absolute z-10 -ml-2 h-8 w-8 animate-bounce'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='animate-spin'
							fill='currentColor'
							stroke='currentColor'
							strokeWidth='0'
							viewBox='0 0 16 16'
						>
							<path d='M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 4c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zM12.773 12.773c-1.275 1.275-2.97 1.977-4.773 1.977s-3.498-0.702-4.773-1.977-1.977-2.97-1.977-4.773c0-1.803 0.702-3.498 1.977-4.773l1.061 1.061c0 0 0 0 0 0-2.047 2.047-2.047 5.378 0 7.425 0.992 0.992 2.31 1.538 3.712 1.538s2.721-0.546 3.712-1.538c2.047-2.047 2.047-5.378 0-7.425l1.061-1.061c1.275 1.275 1.977 2.97 1.977 4.773s-0.702 3.498-1.977 4.773z'></path>
						</svg>
					</div>
					<div
						className='absolute top-4 h-5 w-4 animate-bounce border-l-2 border-gray-200'
						style={{rotate: '-90deg'}}
					></div>
					<div
						className='absolute top-4 h-5 w-4 animate-bounce border-r-2 border-gray-200'
						style={{rotate:' 90deg'}}
					></div>
				</div>
			</>
		);
	}

	const formatDate = (isoDate) => {
		const date = new Date(isoDate);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	return (
		<>
			<div className='bg-white md:mx-auto rounded shadow-xl w-full md:w-1/2 overflow-hidden'>
				<div className='h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500'></div>
				<div className='px-5 py-2 flex flex-col gap-3 pb-6'>
					<div className='h-[105px] shadow-md w-[105px] rounded-full border-4 overflow-hidden -mt-14 border-white'>
						{/* <img
							src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
							className='w-full h-full rounded-full object-center object-cover'
						/> */}
						<Avatar name={user.name} />
					</div>
					<div className=''>
						<h3 className='text-xl text-slate-900 relative font-bold leading-6'>
							{user.name}
						</h3>
						<p className='text-sm text-gray-600'>{user.role}</p>
						<p className='text-sm text-gray-600'>
							{user.email}
							{user.phoneVisibility === 'PUBLIC'
								? ` · ${user.phone}`
								: ''}
						</p>
						<div className='flex mt-2'>
							{user?.socialMedia?.facebook && (
								<Link
									to={user?.socialMedia?.facebook}
									target='_blank'
								>
									<FaFacebook size={24} className='mr-1' />
								</Link>
							)}
							{user?.socialMedia?.instagram && (
								<Link
									to={user?.socialMedia?.instagram}
									target='_blank'
								>
									<FaInstagram size={24} className='mx-1' />
								</Link>
							)}
							{user?.socialMedia?.linkedIn && (
								<Link
									to={user?.socialMedia?.linkedIn}
									target='_blank'
								>
									<FaLinkedin size={24} className='mx-1' />
								</Link>
							)}
							{user?.socialMedia?.twitter && (
								<Link
									to={user?.socialMedia?.twitter}
									target='_blank'
								>
									<FaSquareXTwitter
										size={24}
										className='mx-1'
									/>
								</Link>
							)}
						</div>
					</div>
					<div className='flex gap-2'>
						<button
							type='button'
							className='inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-white px-3 py-2 mb-3 text-sm font-medium text-gray-800 transition hover:border-gray-300 active:bg-white hover:bg-gray-100 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300'
						>
							Send Message
						</button>
					</div>
					<h4 className='text-md font-medium leading-3'>About</h4>
					<p className='text-sm text-stone-500 mb-3'>
						{user.profile.about}
					</p>
					{/* General Information */}
					<h4 className='text-md font-medium leading-3'>
						General Information
					</h4>
					<div className='flex flex-col gap-3 mb-3'>
						{user?.profile && (
							<div className='flex items-center gap-3 px-2 py-3 bg-white rounded border w-full'>
								<div className='leading-2'>
									<p className='text-sm text-slate-700'>
										<span className='font-bold'>
											Gender:{' '}
										</span>
										{user?.profile.gender}
									</p>
									<p className='text-sm text-slate-700'>
										<span className='font-bold'>
											Marital Status:{' '}
										</span>
										{user?.profile.maritalStatus}
									</p>
									<p className='text-sm text-slate-700'>
										<span className='font-bold'>
											Location:{' '}
										</span>
										{user?.profile.location}
									</p>
									<p className='text-sm text-slate-700'>
										<span className='font-bold'>
											Date of birth:{' '}
										</span>
										{formatDate(user?.profile.dob)}
									</p>
								</div>
							</div>
						)}
					</div>
					{/* Education */}
					<h4 className='text-md font-medium leading-3'>Education</h4>
					<div className='flex flex-col gap-3 mb-3'>
						{user?.education?.map((education, index) => (
							<div
								key={index}
								className='flex items-center gap-3 px-2 py-3 bg-white rounded border w-full'
							>
								<div className='leading-2'>
									<p className='text-sm font-normal text-slate-700'>
										{education.institute}
									</p>
									<p className='font-bold text-slate-700'>
										{education.branch}
									</p>
									<p className='text-sm font-normal text-slate-700'>
										{education.degree}
									</p>
									<span className='text-xs text-slate-600'>
										{education.joiningYear} -{' '}
										{education.passingYear}
									</span>
								</div>
							</div>
						))}
						{(user.role === 'STUDENT' ||
							user.role === 'ALUMNI' ||
							user.role === 'ADMIN') &&
							user?.student && (
								<div className='flex items-center gap-3 px-2 py-3 bg-white rounded border w-full'>
									<div className='leading-2'>
										<p className='text-sm font-normal text-slate-700'>
											Thapar Polytechnic College
										</p>
										<p className='font-bold text-slate-700'>
											{user?.student.branch}
										</p>
										<p className='text-sm font-normal text-slate-700'>
											{user?.student.course}
										</p>
										<span className='text-xs text-slate-600'>
											{user?.student.joiningYear} -{' '}
											{user?.student.passingYear}
										</span>
									</div>
								</div>
							)}
					</div>
					{/* Work Experience */}
					<h4 className='text-md font-medium leading-3'>
						Work Experience
					</h4>
					<div className='flex flex-col gap-3'>
						{user?.workExperience?.map((workexp, index) => (
							<div
								key={index}
								className='flex items-center gap-3 px-2 py-3 bg-white rounded border w-full'
							>
								<div className='leading-2'>
									<p className='text-sm font-normal text-slate-700'>
										{workexp.company}
									</p>
									<p className='font-bold text-slate-700'>
										{workexp.jobTitle}
									</p>
									<span className='text-xs text-slate-600'>
										{workexp.joiningYear} -{' '}
										{workexp.leftYear}
									</span>
								</div>
							</div>
						))}
						{user.role === 'FACULTY' ||
						(user.role === 'ALUMNI' && user?.faculty) ? (
							<div className='flex items-center gap-3 px-2 py-3 bg-white rounded border w-full'>
								<div className='leading-2'>
									<p className='text-sm font-normal text-slate-700'>
										{user?.faculty.department}
									</p>
									<p className='font-bold text-slate-700'>
										{user?.faculty.jobTitle}
									</p>
									<span className='text-xs text-slate-600'>
										{user?.faculty.joiningYear} -{' '}
										{user?.faculty.leftYear}
									</span>
								</div>
							</div>
						) : (
							''
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
