const jwt = require('jsonwebtoken');
const prisma = require('../prisma-client');

exports.signup = async (req, res) => {
	try {
		const { name, email, password, phone, phoneVisibility, role } =
			req.body;
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
				phone,
				phoneVisibility,
				role,
			},
		});
		const payload = { id: user.id, role: user.role };
		const token = jwt.sign(payload, process.env.JWT_SECRET);
		res.cookie('token', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateSignup = async (req, res) => {
	try {
		const { id } = req.user;
		const { name, email, phone, phoneVisibility, role } = req.body;
		const user = await prisma.user.update({
			where: {
				id,
			},
			data: {
				name,
				email,
				phone,
				phoneVisibility,
				role,
			},
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.signin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
			include: { profile: true, student: true, faculty: true },
		});
		if (!user) {
			return res.status(400).json({ error: 'Invalid credentials' });
		}
		if (user.password !== password) {
			return res.status(400).json({ error: 'Invalid credentials' });
		}

		let profileExists, studentExists, facultyExists;

		if (user && user.password === password) {
			profileExists = !!user.profile;
			studentExists = !!user.student;
			facultyExists = !!user.faculty;
		} else {
			res.status(401).json({ error: 'Invalid email or password.' });
		}

		const payload = { id: user.id, role: user.role };
		const token = jwt.sign(payload, process.env.JWT_SECRET);
		res.cookie('token', token);

		user.password = undefined;
		res.status(200).json({
			user: user,
			profileExists,
			studentExists,
			facultyExists,
			message: 'Signed in!',
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.logout = (req, res) => {
	res.clearCookie('token');
	res.json({
		message: 'Logged out!',
	});
};
