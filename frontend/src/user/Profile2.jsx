import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaLock, FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { MdEdit, MdEmail } from 'react-icons/md';
import { PiGenderMaleBold } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { GiBigDiamondRing } from "react-icons/gi";
import AddAboutMe from '../components/AddAboutMe';
import { useStore } from '../store';

const Profile = () => {
	const { user, updateUser } = useStore();
	const [isEditing, setIsEditing] = useState(false);
	const [userData, setUserData] = useState(null);
	const [addAboutMeOpen, setAddAboutMeOpen] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			setLoading(true);
			axios
				.get('http://localhost:3000/api/user/profile', {
					withCredentials: true,
				})
				.then((response) => {
					const { user } = response.data;
					setUserData(user);
					updateUser(user);
					setLoading(false);
				});
		} catch (error) {
			console.log('Profile fetch failed! ', error);
		}
	}, []);

	if (loading) {
		return (
			<>
				<div className="flex items-center justify-center min-h-screen bg-white">
					<div className="flex flex-col">
						<div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-blue-500 border-t-transparent shadow-md"></div>
					</div>
				</div>
			</>
		)
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
								<button className='absolute top-2 right-2 text-blue-500 hover:text-blue-700 transition-colors'>
									<MdEdit size={24} />
								</button>
								<div className='flex flex-col items-center'>
									<img
										src={user?.profile?.photo || `https://ui-avatars.com/api/?name=${user?.name}&background=ccc&color=fff`}
										alt='Profile'
										className='w-32 h-32 rounded-full mb-4 object-cover'
									/>
									<h1 className='text-2xl font-bold text-center mb-2'>
										{user?.name}
									</h1>
									<p className='text-gray-600 text-center mb-2'>
										{user?.role}
									</p>
									<p className='text-gray-600 text-center mb-2'>
										{user?.student?.joiningYear} - {user?.student?.passingYear}
									</p>
									<p className='text-gray-600 text-center mb-2'>
										<span className="font-semibold">Roll Number -</span> {user?.student?.rollNo}
									</p>
								</div>
							</div>

							{/* Ohter Details */}
							<div className='bg-white rounded-lg shadow-md p-6'>
								<h2 className='text-xl font-semibold mb-4'>
									Information:
								</h2>
								<p className='flex items-center text-gray-700'>
									<span className="mr-2"><MdEmail /></span>
									{user?.email}
								</p>
								<p className='flex items-center text-gray-700'>
									<span className="mr-2"><FaPhoneAlt /></span>
									{user?.phoneVisibility === 'PUBLIC' ? (
										<>
											{user?.phone}
										</>
									) : (
										<>
											{user?.phone}
											<FaLock />
										</>
									)}
								</p>
								<p className='flex items-center text-gray-700'>
									<span className="mr-2"><SlCalender /></span>
									{formatDate(user?.profile?.dob)}
								</p>
								<p className='flex items-center text-gray-700'>
									<span className="mr-2"><PiGenderMaleBold /></span>
									{user?.profile?.gender}
								</p>
								<p className='flex items-center text-gray-700'>
									<span className="mr-2"><GiBigDiamondRing /></span>
									{user?.profile?.maritalStatus}
								</p>
								<p className='flex items-center text-gray-700'>
									<span className="mr-2"><FaLocationDot /></span>
									{user?.profile?.location}
								</p>
							</div>

							{/* Social Media Links */}
							<div className='bg-white rounded-lg shadow-md p-6'>
								<h2 className='text-xl font-semibold mb-4'>
									Connect With Me
								</h2>
								<div className='flex space-x-4'>
									{user?.socialMedia ? (
										<>
											<a href={user?.socialMedia?.facebook} target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-blue-500 transition-colors'>
												{user?.socialMedia?.facebook && (
													<FaFacebook size={24} />
												)}
											</a>
											<a href={user?.socialMedia?.instagram} target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-blue-500 transition-colors'>
												{user?.socialMedia?.instagram && (
													<FaInstagram size={24} />
												)}
											</a>
											<a href={user?.socialMedia?.linkedin} target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-blue-500 transition-colors'>
												{user?.socialMedia?.linkedin && (
													<FaLinkedin size={24} />
												)}
											</a>
											<a href={user?.socialMedia?.twitter} target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-blue-500 transition-colors'>
												{user?.socialMedia?.twitter && (
													<FaTwitter size={24} />
												)}
											</a>
										</>
									) : (
										<p className='text-gray-600'>No social media links found.</p>
									)}
								</div>
							</div>
						</div>

						{/* Right Column */}
						<div className='md:w-2/3 space-y-4'>
							{/* About Me Section */}
							<div className='bg-white rounded-lg shadow-md p-6'>
								<h2 className='flex items-center justify-between text-xl font-semibold mb-4'>
									About Me
									<button className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setAddAboutMeOpen(true)}>Edit</button>
								</h2>
								<p className='text-gray-700' style={{ whiteSpace: 'pre-wrap' }}>
									{user?.profile?.about}
								</p>
							</div>
							{/* Education Details */}
							<div className='bg-white rounded-lg shadow-md p-6'>
								<h2 className='text-xl font-semibold mb-4'>
									Education
								</h2>
								{user?.education?.map((edu, index) => (
									<div key={index} className='mb-4 last:mb-0'>
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
											{edu.joiningYear} - {edu.passingYear}
										</p>
									</div>
								))}
								{user?.role === 'STUDENT' || user?.role === 'ALUMNI' && user?.student && (
									<div className='mb-4 last:mb-0'>
										<h3 className='font-semibold'>
											Thapar Polytechnic College
										</h3>
										<p className='text-gray-600'>
											{user?.student?.course}
										</p>
										<p className='text-gray-600'>
											{user?.student?.branch}
										</p>
										<p className='text-gray-500'>
											{user?.student?.joiningYear} - {user?.student?.passingYear}
										</p>
									</div>
								)}
							</div>

							{/* Work Experience */}
							<div className='bg-white rounded-lg shadow-md p-6'>
								<h2 className='text-xl font-semibold mb-4'>
									Work Experience
								</h2>
								{user?.role === 'FACULTY' && user?.faculty && (
									<div className='mb-4 last:mb-0'>
										<h3 className='font-semibold'>
											{user?.faculty?.jobTitle}
										</h3>
										<p className='text-gray-600'>
											{user?.faculty?.department}
										</p>
										<p className='text-gray-500'>
											{user?.faculty?.joiningYear} - {user?.faculty?.leftYear}
										</p>
									</div>
								)}
								{user?.workExperience.map(
									(exp, index) => (
										<div
											key={index}
											className='mb-4 last:mb-0'
										>
											<h3 className='font-semibold'>
												{exp.jobTitle}
											</h3>
											<p className='text-gray-600'>
												{exp.company}
											</p>
											<p className='text-gray-500'>
												{exp.joiningYear} - {exp.leftYear}
											</p>
										</div>
									)
								)}
							</div>
						</div>
					</div>

					{isEditing && (
						<div className='mt-6 flex justify-end'>
							<button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors' >
								Save Changes
							</button>
						</div>
					)}
				</div>
			</div>
			{addAboutMeOpen && (
				<AddAboutMe addAboutMeOpen={addAboutMeOpen} setAddAboutMeOpen={setAddAboutMeOpen} />
			)}
		</>
	);
};

export default Profile;
