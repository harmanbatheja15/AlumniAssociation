const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173',
	})
);

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
