const prisma = require('../prisma-client');

exports.getProfile = async (req, res) => {
	try {
		const { id } = req.user;
		const user = await prisma.user.findUnique({
			where: {
				id: id,
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
		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getInformation = async (req, res) => {
	try {
		const { id } = req.user;
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
			include: {
				profile: true,
			},
		});
		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

exports.addProfile = async (req, res) => {
	try {
		const { id } = req.user;
		const { gender, maritalStatus, location, dob, about } = req.body;
		const profile = await prisma.profile.create({
			data: {
				userId: id,
				gender,
				maritalStatus,
				location,
				dob,
				about,
			},
		});
		res.status(200).json(profile);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateProfile = async (req, res) => {
	try {
		const { id } = req.user;
		const { gender, maritalStatus, location, dob, about } = req.body;
		const profile = await prisma.profile.update({
			where: {
				userId: id,
			},
			data: {
				gender,
				maritalStatus,
				location,
				dob,
				about,
			},
		});
		res.status(200).json(profile);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
