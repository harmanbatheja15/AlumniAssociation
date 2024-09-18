import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { isAuthenticatedFunc } from './auth/helper/index';
import Navbar from './components/Navbar';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AddProfile from './user/AddProfile';
import AddStudentDetails from './user/AddStudentDetails';
import AddFacultyDetails from './user/AddFacultyDetails';
import Profile from './user/Profile';
import Footer from './components/Footer';
import AlumniDirectory from './user/AlumniDirectory';
import NewsEvents from './user/NewsEvents';
import UserDetail from './user/userDetail';
import Chat from './user/Chat';

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const checkAuth = () => {
		const token = Cookies.get('token');
		setIsAuthenticated(!!token);
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<>
			<BrowserRouter>
				<Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/signin' element={<Signin setIsAuthenticated={setIsAuthenticated} />} />
					<Route path='/addProfile' element={isAuthenticatedFunc() ? <AddProfile /> : <Navigate to='/signin' />} />
					<Route path='/addStudent' element={isAuthenticatedFunc() ? <AddStudentDetails /> : <Navigate to='/signin' />} />
					<Route path='/addFaculty' element={isAuthenticatedFunc() ? <AddFacultyDetails /> : <Navigate to='/signin' />} />
					<Route path='/profile' element={isAuthenticatedFunc() ? <Profile /> : <Navigate to='/signin' />} />
					<Route path='/alumniDirectory' element={<AlumniDirectory />} />
					<Route path='/news&events' element={<NewsEvents />} />
					<Route path='/userDetail/:id' element={<UserDetail />} />
					<Route path='/chat/:id' element={<Chat />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default App;
