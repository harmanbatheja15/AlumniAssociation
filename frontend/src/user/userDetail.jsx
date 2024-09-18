import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import {
	FaLinkedin,
	FaTwitter,
	FaFacebook,
	FaInstagram,
	FaLock,
	FaPhoneAlt,
} from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { PiGenderMaleBold } from 'react-icons/pi';
import { SlCalender } from 'react-icons/sl';
import { GiBigDiamondRing } from 'react-icons/gi';
import { useStore } from '../store';

const UserDetail = () => {
	const { userDetails, updateUserDetails } = useStore();
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const [user, setUser] = useState();

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					`http://localhost:3000/api/user/${id}`,
					{
						withCredentials: true,
					}
				);
				setUser(response.data);
				updateUserDetails(response.data);
				setLoading(false);
			} catch (error) {
				console.log('Profile fetch failed! ', error);
			}
		};
		fetchUserProfile();
	}, []);

	if (loading) {
		return (
			<>
				<div className='flex items-center justify-center min-h-screen bg-white'>
					<div className='flex flex-col'>
						<div className='w-12 h-12 rounded-full animate-spin border-4 border-solid border-blue-500 border-t-transparent shadow-md'></div>
					</div>
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
			<div className='w-full'>
				<div className='xl:px-60 py-10 p-4 bg-gray-100 min-h-screen'>
					<div className='flex flex-col md:flex-row gap-4'>
						{/* Left Column */}
						<div className='md:w-1/3 space-y-4'>
							{/* Profile Picture and Basic Info */}
							<div className='bg-white rounded-lg shadow-md p-6 relative'>
								<div className='flex flex-col items-center'>
									<img
										src={
											userDetails?.profile?.photo ||
											`https://ui-avatars.com/api/?name=${userDetails?.name}&background=ccc&color=fff`
										}
										alt='Profile'
										className='w-32 h-32 rounded-full mb-4 object-cover'
									/>
									<h1 className='text-2xl font-bold text-center mb-2'>
										{userDetails?.name}
									</h1>
									<p className='text-gray-600 text-center mb-2'>
										{userDetails?.role}
									</p>
									<p className='text-gray-600 text-center mb-2'>
										{(userDetails?.role === 'STUDENT' || userDetails?.role === 'ALUMNI') && (userDetails?.student?.joiningYear + ' - ' + userDetails?.student?.passingYear)}
										{userDetails?.role === 'FACULTY' && (userDetails?.faculty && userDetails?.faculty?.joiningYear + ' - ' + userDetails?.faculty?.leftYear)}
									</p>
									{/* {(userDetails?.role === 'STUDENT' || userDetails?.role === 'ALUMNI') && (
										<p className='text-gray-600 text-center mb-2'>
											<span className='font-semibold'>
												Roll Number -
											</span>{' '}
											{userDetails?.student?.rollNo}
										</p>
									)} */}
									<Link to={`/chat/${userDetails?.id}`}>
										<button
											type='button'
											className='inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-white px-3 py-2 mb-3 text-sm font-medium text-gray-800 transition hover:border-gray-300 active:bg-white hover:bg-gray-100 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300'
										>
											Send Message
										</button>
									</Link>
								</div>
							</div>

							{/* Ohter Details */}
							<div className='bg-white rounded-lg shadow-md p-6'>
								<h2 className='text-xl font-semibold mb-4'>
									Information:
								</h2>
								<p className='flex items-center text-gray-700'>
									<span className='mr-2'>
										<MdEmail />
									</span>
									<span className='break-all'>
										{userDetails?.email}
									</span>
								</p>
								<p className='flex items-center text-gray-700'>
									<span className='mr-2'>
										<FaPhoneAlt />
									</span>
									{userDetails?.phoneVisibility === 'PUBLIC' ? (
										<>{userDetails?.phone}</>
									) : (
										<>
											<span className='mr-2'>
												{userDetails?.phone}
											</span>
											<FaLock />
										</>
									)}
								</p>
								<p className='flex items-center text-gray-700'>
									<span className='mr-2'>
										<SlCalender />
									</span>
									{formatDate(userDetails?.profile?.dob)}
								</p>
								<p className='flex items-center text-gray-700'>
									<span className='mr-2'>
										<PiGenderMaleBold />
									</span>
									{userDetails?.profile?.gender}
								</p>
								<p className='flex items-center text-gray-700'>
									<span className='mr-2'>
										<GiBigDiamondRing />
									</span>
									{userDetails?.profile?.maritalStatus}
								</p>
								<p className='flex items-center text-gray-700'>
									<span className='mr-2'>
										<FaLocationDot />
									</span>
									{userDetails?.profile?.location}
								</p>
							</div>

							{/* Social Media Links */}
							<div className='bg-white rounded-lg shadow-md p-6'>
								<h2 className='text-xl font-semibold mb-4'>
									Connect With Me
								</h2>
								<div className='flex space-x-4'>
									{userDetails?.socialMedia?.linkedin !== '' ||
									userDetails?.socialMedia?.instagram !== '' ||
									userDetails?.socialMedia?.twitter !== '' ||
									userDetails?.socialMedia?.facebook !== '' ? (
										<>
											{userDetails?.socialMedia?.linkedin && (
												<a
													href={`https://linkedin.com/in/${userDetails?.socialMedia?.linkedin}`}
													target='_blank'
													rel='noopener noreferrer'
													className='text-gray-600 hover:text-blue-500 transition-colors'
												>
													<FaLinkedin size={24} />
												</a>
											)}
											{userDetails?.socialMedia?.instagram && (
												<a
													href={`https://instagram.com/${userDetails?.socialMedia?.instagram}`}
													target='_blank'
													rel='noopener noreferrer'
													className='text-gray-600 hover:text-blue-500 transition-colors'
												>
													<FaInstagram size={24} />
												</a>
											)}
											{userDetails?.socialMedia?.twitter && (
												<a
													href={`https://x.com/${userDetails?.socialMedia?.twitter}`}
													target='_blank'
													rel='noopener noreferrer'
													className='text-gray-600 hover:text-blue-500 transition-colors'
												>
													<FaTwitter size={24} />
												</a>
											)}
											{userDetails?.socialMedia?.facebook && (
												<a
													href={`https://facebook.com/${userDetails?.socialMedia?.facebook}`}
													target='_blank'
													rel='noopener noreferrer'
													className='text-gray-600 hover:text-blue-500 transition-colors'
												>
													<FaFacebook size={24} />
												</a>
											)}
										</>
									) : (
										<p className='text-gray-600'>
											No social media links found!
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Right Column */}
						<div className='md:w-2/3 space-y-4'>
							{/* About Me Section */}
							<div className='bg-white rounded-lg shadow-md p-6'>
								<h2 className='text-xl font-semibold mb-4'>
									About Me
								</h2>
								<p
									className='text-gray-700'
									style={{ whiteSpace: 'pre-wrap' }}
								>
									{userDetails?.profile?.about}
								</p>
							</div>
							{/* Education Details */}
							<div className='bg-white rounded-lg shadow-md p-6'>
								<h2 className='text-xl font-semibold mb-4'>
									Education
								</h2>
								{userDetails?.education?.slice().reverse().map((edu) => (
									<div
										key={edu.id}
										className='flex items-start justify-between mb-4 last:mb-0 bg-gray-50 rounded-md p-4'
									>
										<div className=''>
											<h3 className='font-semibold'>
												{edu.institute}
											</h3>
											<p className='text-gray-600'>
												{edu.degree}
											</p>
											<p className='text-gray-600'>
												{edu.branch}
											</p>
											<p className='text-gray-500'>
												{edu.joiningYear} -{' '}
												{edu.passingYear}
											</p>
										</div>
									</div>
								))}
								{(userDetails?.role === 'STUDENT' ||
									userDetails?.role === 'ALUMNI') &&
									userDetails?.student && (
										<div className='flex items-start justify-between mb-4 last:mb-0 bg-gray-50 rounded-md p-4'>
											<div className=''>
												<h3 className='font-semibold'>
													{userDetails?.student?.institute || 'Thapar Polytechnic College'}
												</h3>
												<p className='text-gray-600'>
													{userDetails?.student?.course}
												</p>
												<p className='text-gray-600'>
													{userDetails?.student?.branch}
												</p>
												<p className='text-gray-500'>
													{userDetails?.student?.joiningYear}{' '}
													-{' '}
													{userDetails?.student?.passingYear} Batch
												</p>
												<p className='text-gray-600'>
													<span className='font-semibold'>
														Roll Number - {' '}
													</span>
													{userDetails?.student?.rollNo}
												</p>
											</div>
										</div>
									)}
							</div>

							{/* Work Experience */}
							<div className='bg-white rounded-lg shadow-md p-6'>
								<h2 className='text-xl font-semibold mb-4'>
									Work Experience
								</h2>
								{userDetails?.role === 'FACULTY' && userDetails?.faculty && (
									<div className='flex items-start justify-between mb-4 last:mb-0 bg-gray-50 rounded-md p-4'>
										<div className=''>
											<h3 className='font-semibold'>
												{userDetails?.faculty?.jobTitle}
											</h3>
											<p className='text-gray-600'>
												{userDetails?.faculty?.department}
											</p>
											<p className='text-gray-500'>
												{userDetails?.faculty?.joiningYear} -{' '}
												{userDetails?.faculty?.leftYear}
											</p>
										</div>
									</div>
								)}
								{userDetails?.workExperience.map((exp) => (
									<div
										key={exp.id}
										className='flex items-start justify-between mb-4 last:mb-0 bg-gray-50 rounded-md p-4'
									>
										<div className=''>
											<h3 className='font-semibold'>
												{exp.jobTitle}
											</h3>
											<p className='text-gray-600'>
												{exp.company}
											</p>
											<p className='text-gray-500'>
												{exp.joiningYear} -{' '}
												{exp.leftYear}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserDetail;
