import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
	FaLinkedin,
	FaTwitter,
	FaFacebook,
	FaInstagram,
	FaLock,
	FaPhoneAlt,
	FaGraduationCap,
	FaBriefcase,
	FaUser,
} from 'react-icons/fa';
import { IoShareSocial } from "react-icons/io5";
import { FaLocationDot } from 'react-icons/fa6';
import { MdEdit, MdEmail } from 'react-icons/md';
import { PiGenderMaleBold } from 'react-icons/pi';
import { SlCalender } from 'react-icons/sl';
import { GiBigDiamondRing } from 'react-icons/gi';
import EditAboutMe from '../components/EditAboutMe';
import { useStore } from '../store';
import EditSocialMedia from '../components/EditSocialMedia';
import EditInformation from '../components/EditInformation';
import AddEducation from '../components/AddEducation';
import AddWorkExperience from '../components/AddWorkExperience';
import EditProfile from '../components/EditProfile';
import EditWorkExperience from '../components/EditWorkExperience';
import EditFaculty from '../components/EditFaculty';
import EditStudent from '../components/EditStudent';
import EditEducation from '../components/EditEducation';

const Button = ({ icon, label, onClick }) => (
	<button
		onClick={onClick}
		className='flex items-center justify-center px-4 py-2 bg-white text-blue-600 rounded-full shadow-md hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
		aria-label={label}
	>
		{icon}
		<span className='ml-2'>{label}</span>
	</button>
);

const Profile = () => {
	const {
		user,
		updateUser,
		aboutMe,
		updateAboutMe,
		socialMedia,
		updateSocialMedia,
	} = useStore();
	const [editProfileOpen, setEditProfileOpen] = useState(false);
	const [editInformationOpen, setEditInformationOpen] = useState(false);
	const [editSocialMediaOpen, setEditSocialMediaOpen] = useState(false);
	const [editAboutMeOpen, setEditAboutMeOpen] = useState(false);
	const [addEducationOpen, setAddEducationOpen] = useState(false);
	const [addWorkExperienceOpen, setAddWorkExperienceOpen] = useState(false);
	const [editWorkExperienceOpen, setEditWorkExperienceOpen] = useState(false);
	const [editFacultyOpen, setEditFacultyOpen] = useState(false);
	const [editStudentOpen, setEditStudentOpen] = useState(false);
	const [editEducationOpen, setEditEducationOpen] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					'http://localhost:3000/api/user/profile',
					{
						withCredentials: true,
					}
				);
				const { user } = response.data;
				updateUser(user);
				updateAboutMe(user?.profile?.about);
				updateSocialMedia(user?.socialMedia || {});
				setLoading(false);
				console.log('USER: ', user);
			} catch (error) {
				console.log('Profile fetch failed! ', error);
			}
		};
		fetchUserProfile();
	}, [updateUser, updateSocialMedia]);

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
				{/* Banner */}
				<div className='w-full bg-gray-500 text-white p-4 md:p-6 shadow-lg z-50'>
					<div className='container mx-auto'>
						<div className='flex flex-col md:flex-row items-center justify-between'>
							<div className='mb-4 md:mb-0'>
								<h2 className='text-xl md:text-2xl font-bold mb-2'>
									Complete Your Profile
								</h2>
								<p className='text-sm md:text-base'>
									Enhance your experience by adding more
									information to your profile!
								</p>
							</div>
							<div className='flex flex-wrap gap-2 md:gap-4'>
								{!user?.profile && (
									<Button
										icon={<FaUser />}
										label='Complete Profile'
										onClick={() => {}}
									/>
								)}
								{!user?.student &&
									(user?.role === 'STUDENT' ||
										user?.role === 'ALUMNI') && (
										<Button
											icon={<FaUser />}
											label='Add Student Details'
										/>
									)}
								{!user?.faculty && user?.role === 'FACULTY' && (
									<Link to='/addFaculty'>
										<Button
											icon={<FaUser />}
											label='Add Faculty Details'
										/>
									</Link>
								)}
								{user?.education?.length === 0 && (
									<Button
										icon={<FaGraduationCap />}
										label='Add Education'
										onClick={() =>
											setAddEducationOpen(true)
										}
									/>
								)}
								{user?.role === 'ALUMNI' && user?.workExperience?.length === 0 && (
									<Button
										icon={<FaBriefcase />}
										label='Add Work Experience'
										onClick={() =>
											setAddWorkExperienceOpen(true)
										}
									/>
								)}
								{user?.socialMedia?.linkedin === '' &&
									user?.socialMedia?.instagram === '' &&
									user?.socialMedia?.twitter === '' &&
									user?.socialMedia?.facebook === '' && (
										<Button
											icon={<IoShareSocial />}
											label='Add Social Media'
											onClick={() =>
												setEditSocialMediaOpen(true)
											}
										/>
									)}
							</div>
						</div>
					</div>
				</div>

				<div className='xl:px-60 py-10 p-4 bg-gray-100 min-h-screen'>
					<div className='flex flex-col md:flex-row gap-4'>
						{/* Left Column */}
						<div className='md:w-1/3 space-y-4'>
							{/* Profile Picture and Basic Info */}
							<div className='bg-white rounded-lg shadow-md p-6 relative'>
								<div className='flex items-center justify-end'>
									<button
										className='w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:text-sm'
										onClick={() => setEditProfileOpen(true)}
									>
										Edit
									</button>
								</div>
								<div className='flex flex-col items-center'>
									<img
										src={
											user?.profile?.photo ||
											`https://ui-avatars.com/api/?name=${user?.name}&background=ccc&color=fff`
										}
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
										{user?.role === 'STUDENT' ||
											(user?.role === 'ALUMNI' &&
												user?.student?.joiningYear +
													' - ' +
													user?.student?.passingYear)}
										{user?.role === 'FACULTY' &&
											user?.faculty &&
											user?.faculty?.joiningYear +
												' - ' +
												user?.faculty?.leftYear}
									</p>
									{user?.role === 'STUDENT' ||
										(user?.role === 'ALUMNI' && (
											<p className='text-gray-600 text-center mb-2'>
												<span className='font-semibold'>
													Roll Number -
												</span>{' '}
												{user?.student?.rollNo}
											</p>
										))}
								</div>
							</div>

							{/* Ohter Details */}
							<div className='bg-white rounded-lg shadow-md p-6'>
								<h2 className='flex items-center justify-between text-xl font-semibold mb-4'>
									Information:
									<button
										className='w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:text-sm'
										onClick={() =>
											setEditInformationOpen(true)
										}
									>
										Edit
									</button>
								</h2>
								<p className='flex items-center text-gray-700'>
									<span className='mr-2'>
										<MdEmail />
									</span>
									<span className='break-all'>
										{user?.email}
									</span>
								</p>
								<p className='flex items-center text-gray-700'>
									<span className='mr-2'>
										<FaPhoneAlt />
									</span>
									{user?.phoneVisibility === 'PUBLIC' ? (
										<>{user?.phone}</>
									) : (
										<>
											<span className='mr-2'>
												{user?.phone}
											</span>
											<FaLock />
										</>
									)}
								</p>
								<p className='flex items-center text-gray-700'>
									<span className='mr-2'>
										<SlCalender />
									</span>
									{formatDate(user?.profile?.dob)}
								</p>
								<p className='flex items-center text-gray-700'>
									<span className='mr-2'>
										<PiGenderMaleBold />
									</span>
									{user?.profile?.gender}
								</p>
								<p className='flex items-center text-gray-700'>
									<span className='mr-2'>
										<GiBigDiamondRing />
									</span>
									{user?.profile?.maritalStatus}
								</p>
								<p className='flex items-center text-gray-700'>
									<span className='mr-2'>
										<FaLocationDot />
									</span>
									{user?.profile?.location}
								</p>
							</div>

							{/* Social Media Links */}
							<div className='bg-white rounded-lg shadow-md p-6'>
								<h2 className='flex items-center justify-between text-xl font-semibold mb-4'>
									Connect With Me
									<button
										className='w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:text-sm'
										onClick={() =>
											setEditSocialMediaOpen(true)
										}
									>
										Edit
									</button>
								</h2>
								<div className='flex space-x-4'>
									{socialMedia?.linkedin !== '' ||
									socialMedia?.instagram !== '' ||
									socialMedia?.twitter !== '' ||
									socialMedia?.facebook !== '' ? (
										<>
											{socialMedia?.linkedin && (
												<a
													href={`https://linkedin.com/in/${socialMedia?.linkedin}`}
													target='_blank'
													rel='noopener noreferrer'
													className='text-gray-600 hover:text-blue-500 transition-colors'
												>
													<FaLinkedin size={24} />
												</a>
											)}
											{socialMedia?.instagram && (
												<a
													href={`https://instagram.com/${socialMedia?.instagram}`}
													target='_blank'
													rel='noopener noreferrer'
													className='text-gray-600 hover:text-blue-500 transition-colors'
												>
													<FaInstagram size={24} />
												</a>
											)}
											{socialMedia?.twitter && (
												<a
													href={`https://x.com/${socialMedia?.twitter}`}
													target='_blank'
													rel='noopener noreferrer'
													className='text-gray-600 hover:text-blue-500 transition-colors'
												>
													<FaTwitter size={24} />
												</a>
											)}
											{socialMedia?.facebook && (
												<a
													href={`https://facebook.com/${socialMedia?.facebook}`}
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
								<h2 className='flex items-center justify-between text-xl font-semibold mb-4'>
									About Me
									<button
										className='w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:text-sm'
										onClick={() => setEditAboutMeOpen(true)}
									>
										Edit
									</button>
								</h2>
								<p
									className='text-gray-700'
									style={{ whiteSpace: 'pre-wrap' }}
								>
									{aboutMe}
								</p>
							</div>
							{/* Education Details */}
							<div className='bg-white rounded-lg shadow-md p-6'>
								<h2 className='flex items-center justify-between text-xl font-semibold mb-4'>
									Education
									<button
										className='w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:text-sm'
										onClick={() =>
											setAddEducationOpen(true)
										}
									>
										Add
									</button>
								</h2>
								{user?.education?.map((edu, index) => (
									<div
										key={index}
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
										<div className=''>
											<button
												className='text-black transition-colors'
												onClick={() =>
													setEditEducationOpen(true)
												}
											>
												<MdEdit size={24} />
											</button>
										</div>
									</div>
								))}
								{(user?.role === 'STUDENT' ||
									user?.role === 'ALUMNI') &&
									user?.student && (
										<div className='flex items-start justify-between mb-4 last:mb-0 bg-gray-50 rounded-md p-4'>
											<div className=''>
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
													{user?.student?.joiningYear}{' '}
													-{' '}
													{user?.student?.passingYear}
												</p>
											</div>
											<div className=''>
												<button
													className='text-black transition-colors'
													onClick={() =>
														setEditStudentOpen(true)
													}
												>
													<MdEdit size={24} />
												</button>
											</div>
										</div>
									)}
							</div>

							{/* Work Experience */}
							<div className='bg-white rounded-lg shadow-md p-6'>
								<h2 className='flex items-center justify-between text-xl font-semibold mb-4'>
									Work Experience
									<button
										className='w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:text-sm'
										onClick={() =>
											setAddWorkExperienceOpen(true)
										}
									>
										Add
									</button>
								</h2>
								{user?.role === 'FACULTY' && user?.faculty && (
									<div className='flex items-start justify-between mb-4 last:mb-0 bg-gray-50 rounded-md p-4'>
										<div className=''>
											<h3 className='font-semibold'>
												{user?.faculty?.jobTitle}
											</h3>
											<p className='text-gray-600'>
												{user?.faculty?.department}
											</p>
											<p className='text-gray-500'>
												{user?.faculty?.joiningYear} -{' '}
												{user?.faculty?.leftYear}
											</p>
										</div>
										<div className=''>
											<button className='text-black transition-colors'>
												<MdEdit size={24} />
											</button>
										</div>
									</div>
								)}
								{user?.workExperience.map((exp, index) => (
									<div
										key={index}
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
										<div className=''>
											<button
												className='text-black transition-colors'
												onClick={() =>
													setEditWorkExperienceOpen(
														true
													)
												}
											>
												<MdEdit size={24} />
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			{editProfileOpen && (
				<EditProfile setEditProfileOpen={setEditProfileOpen} />
			)}
			{editInformationOpen && (
				<EditInformation
					setEditInformationOpen={setEditInformationOpen}
				/>
			)}
			{editSocialMediaOpen && (
				<EditSocialMedia
					setEditSocialMediaOpen={setEditSocialMediaOpen}
				/>
			)}
			{editAboutMeOpen && (
				<EditAboutMe setEditAboutMeOpen={setEditAboutMeOpen} />
			)}
			{addEducationOpen && (
				<AddEducation setAddEducationOpen={setAddEducationOpen} />
			)}
			{addWorkExperienceOpen && (
				<AddWorkExperience
					setAddWorkExperienceOpen={setAddWorkExperienceOpen}
				/>
			)}
			{editWorkExperienceOpen && (
				<EditWorkExperience
					setEditWorkExperienceOpen={setEditWorkExperienceOpen}
				/>
			)}
			{editFacultyOpen && (
				<EditFaculty setEditFacultyOpen={setEditFacultyOpen} />
			)}
			{editStudentOpen && (
				<EditStudent setEditStudentOpen={setEditStudentOpen} />
			)}
			{editEducationOpen && (
				<EditEducation setEditEducationOpen={setEditEducationOpen} />
			)}
		</>
	);
};

export default Profile;
