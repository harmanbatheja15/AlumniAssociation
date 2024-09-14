const prisma = require('../prisma-client');

// Student Details
exports.addStudentDetails = async (req, res) => {
	try {
		const { id } = req.user;
		const { course, branch, joiningYear, passingYear, rollNo } = req.body;
		const student = await prisma.student.create({
			data: {
				userId: id,
				course,
				branch,
				joiningYear,
				passingYear,
				rollNo,
			},
		});
		res.status(200).json(student);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateStudentDetails = async (req, res) => {
	try {
		const { id } = req.user;
		const { course, branch, joiningYear, passingYear, rollNo } = req.body;
		const student = await prisma.student.update({
			where: {
				userId: id,
			},
			data: {
				course,
				branch,
				joiningYear,
				passingYear,
				rollNo,
			},
		});
		res.status(200).json(student);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Faculty Details
exports.addFacultyDetails = async (req, res) => {
	try {
		const { id } = req.user;
		const { jobTitle, department, joiningYear, leftYear } = req.body;
		const faculty = await prisma.faculty.create({
			data: {
				userId: id,
				jobTitle,
				department,
				joiningYear,
				leftYear,
			},
		});
		res.status(200).json(faculty);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateFacultyDetails = async (req, res) => {
	try {
		const { id } = req.user;
		const { jobTitle, department, joiningYear, leftYear } = req.body;
		const faculty = await prisma.faculty.update({
			where: {
				userId: id,
			},
			data: {
				jobTitle,
				department,
				joiningYear,
				leftYear,
			},
		});
		res.status(200).json(faculty);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Education
exports.addEducation = async (req, res) => {
	try {
		const { id } = req.user;
		const { institute, degree, branch, joiningYear, passingYear } =
			req.body;
		const education = await prisma.education.create({
			data: {
				userId: id,
				institute,
				degree,
				branch,
				joiningYear,
				passingYear,
			},
		});
		res.status(200).json(education);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateEducation = async (req, res) => {
	try {
		const { id } = req.user;
		const { institute, degree, branch, joiningYear, passingYear } =
			req.body;
		const education = await prisma.education.update({
			where: {
				userId: id,
			},
			data: {
				institute,
				degree,
				branch,
				joiningYear,
				passingYear,
			},
		});
		res.status(200).json(education);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Social Media
exports.getSocialMedia = async (req, res) => {
	try {
		const { id } = req.user;
		const socialMedia = await prisma.socialMedia.findUnique({
			where: {
				id: parseInt(id),
			},
		});
		res.status(200).json(socialMedia);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.addSocialMedia = async (req, res) => {
	try {
		const { id } = req.user;
		const { facebook, instagram, linkedin, twitter } = req.body;
		const socialMedia = await prisma.socialMedia.create({
			data: {
				userId: id,
				facebook,
				instagram,
				linkedin,
				twitter,
			},
		});
		res.status(200).json(socialMedia);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateSocialMedia = async (req, res) => {
	try {
		const { id } = req.user;
		const { facebook, instagram, linkedin, twitter } = req.body;
		const socialMedia = await prisma.socialMedia.update({
			where: {
				userId: id,
			},
			data: {
				facebook,
				instagram,
				linkedin,
				twitter,
			},
		});
		res.status(200).json(socialMedia);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Work Experience
exports.addWorkExperience = async (req, res) => {
	try {
		const { id } = req.user;
		const { company, jobTitle, joiningYear, leftYear } = req.body;
		const workExperience = await prisma.workExperience.create({
			data: {
				userId: id,
				company,
				jobTitle,
				joiningYear,
				leftYear,
			},
		});
		res.status(200).json(workExperience);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateWorkExperience = async (req, res) => {
	try {
		const { id } = req.user;
		const { company, jobTitle, joiningYear, leftYear } = req.body;
		const workExperience = await prisma.workExperience.update({
			where: {
				userId: id,
			},
			data: {
				company,
				jobTitle,
				joiningYear,
				leftYear,
			},
		});
		res.status(200).json(workExperience);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all users
exports.getAllUsers = async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).json({
			users: users,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get user by id
exports.getUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await prisma.user.findUnique({
			where: {
				id: parseInt(id),
			},
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
