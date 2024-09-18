const express = require('express');
const { userMiddleware, roleMiddleware } = require('../middlewares/user');
const { signup, signin, logout, updateSignup } = require('../controllers/auth');
const {
	addProfile,
	updateProfile,
	getProfile,
	getInformation,
} = require('../controllers/profile');
const {
	addEducation,
	addSocialMedia,
	addWorkExperience,
	addStudentDetails,
	addFacultyDetails,
	updateStudentDetails,
	updateFacultyDetails,
	updateEducation,
	updateSocialMedia,
	updateWorkExperience,
	getAllUsers,
	getUserById,
	getSocialMedia
} = require('../controllers/userDetails');
const router = express.Router();

// Check if server is up
router.get('/', (req, res) => {
	res.json({ message: 'Server is up!' });
});

// Signup
router.post('/signup', signup);
router.put('/signup', userMiddleware, updateSignup);

// Signin
router.post('/signin', signin);

// Logout
router.post('/logout', logout);

// Profile Details
router.get('/information', userMiddleware, getInformation);
router.get('/profile', userMiddleware, getProfile);
router.post('/profile', userMiddleware, addProfile);
router.put('/profile', userMiddleware, updateProfile);

// Student Details
router.post(
	'/student',
	userMiddleware,
	roleMiddleware(['STUDENT', 'ALUMNI', 'ADMIN']),
	addStudentDetails
);
router.put(
	'/student',
	userMiddleware,
	roleMiddleware(['STUDENT', 'ALUMNI', 'ADMIN']),
	updateStudentDetails
);

// Faculty Details
router.post(
	'/faculty',
	userMiddleware,
	roleMiddleware(['FACULTY', 'ADMIN']),
	addFacultyDetails
);
router.put(
	'/faculty',
	userMiddleware,
	roleMiddleware(['FACULTY', 'ADMIN']),
	updateFacultyDetails
);

// Education
router.post(
	'/education',
	userMiddleware,
	addEducation
);
router.put(
	'/education/:id',
	userMiddleware,
	updateEducation
);

// Social Media
router.get('/socialMedia', userMiddleware, getSocialMedia);
router.post('/socialMedia', userMiddleware, addSocialMedia);
router.put('/socialMedia', userMiddleware, updateSocialMedia);

// Work Experience
router.post('/workExperience', userMiddleware, addWorkExperience);
router.put('/workExperience/:id', userMiddleware, updateWorkExperience);

// Get all users
router.get('/users', userMiddleware, getAllUsers);

// Get user by id
router.get('/user/:id', userMiddleware, getUserById);

module.exports = router;
