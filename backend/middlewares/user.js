const jwt = require('jsonwebtoken');

const userMiddleware = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).json({ error: 'Unauthorized!' });
	}
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({ error: 'Unauthorized!' });
	}
};

const roleMiddleware = (allowedRoles) => {
	return (req, res, next) => {
		const { role } = req.user;
		if (allowedRoles.includes(role)) {
			next();
		} else {
			res.status(403).json({ error: 'Access denied!' });
		}
	};
};

module.exports = { userMiddleware, roleMiddleware };
