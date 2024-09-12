const express = require('express');
const prisma = require('../prisma-client');
const { userMiddleware, roleMiddleware } = require('../middlewares/user');
const router = express.Router();

// Get all users
router.get(
	'/users',
	userMiddleware,
	roleMiddleware(['ADMIN']),
	async (req, res) => {
		try {
			const verifiedUsers = await prisma.user.findMany({
				where: {
					isVerified: true,
				},
			});
			const unverifiedUsers = await prisma.user.findMany({
				where: {
					isVerified: false,
				},
			});
			res.status(200).json({
				verifiedUsers: verifiedUsers,
				unverifiedUsers: unverifiedUsers,
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
);

module.exports = router;
