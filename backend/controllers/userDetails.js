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

        const parsedJoiningYear = parseInt(joiningYear, 10);
        const parsedPassingYear = parseInt(passingYear, 10);

        if (isNaN(parsedJoiningYear) || isNaN(parsedPassingYear)) {
            return res.status(400).json({ error: "Joining Year and Passing Year must be valid numbers." });
        }

        const student = await prisma.student.update({
            where: {
                userId: id,
            },
            data: {
                course,
                branch,
                joiningYear: parsedJoiningYear,
                passingYear: parsedPassingYear,
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
        const { id } = req.params; // Get the education ID from URL parameters
        const { institute, degree, branch, joiningYear, passingYear } = req.body;

        // Convert joiningYear and passingYear to integers
        const parsedJoiningYear = parseInt(joiningYear, 10);
        const parsedPassingYear = parseInt(passingYear, 10);

        // Validate that the parsed years are numbers
        if (isNaN(parsedJoiningYear) || isNaN(parsedPassingYear)) {
            return res.status(400).json({ error: "Joining Year and Passing Year must be valid numbers." });
        }

        // Update the education record using the parsed integer ID
        const education = await prisma.education.update({
            where: {
                id: parseInt(id, 10), // Ensure the ID is also an integer
            },
            data: {
                institute,
                degree,
                branch,
                joiningYear: parsedJoiningYear,
                passingYear: parsedPassingYear,
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

		const parsedJoiningYear = parseInt(joiningYear, 10);

		if (isNaN(parsedJoiningYear)) {
            return res.status(400).json({ error: "Joining Year must be a valid number." });
        }

		const workExperience = await prisma.workExperience.create({
			data: {
				userId: id,
				company,
				jobTitle,
				joiningYear: parsedJoiningYear,
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
        const { id } = req.params;
        const { jobTitle, company, joiningYear, leftYear } = req.body;

        const workExperienceId = parseInt(id, 10);
        
        if (isNaN(workExperienceId)) {
            return res.status(400).json({ error: "Invalid work experience ID provided." });
        }

        const parsedJoiningYear = parseInt(joiningYear, 10);

        if (isNaN(parsedJoiningYear)) {
            return res.status(400).json({ error: "Joining Year must be a valid number." });
        }

        const updatedWorkExp = await prisma.workExperience.update({
            where: {
                id: workExperienceId,
            },
            data: {
                jobTitle,
                company,
                joiningYear: parsedJoiningYear,
                leftYear,
            },
        });

        res.status(200).json(updatedWorkExp);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
	try {
		const users = await prisma.user.findMany({
			include: {
				student: true,
				faculty: true,
			},
		});
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
			include: {
				profile: true,
				student: true,
				faculty: true,
				education: true,
				socialMedia: true,
				workExperience: true,
			},
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
