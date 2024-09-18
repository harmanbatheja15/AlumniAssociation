import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
	const { user } = useStore();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [newsEventsDropdown, setNewsEventsDropdown] = useState(false);

	const navigate = useNavigate();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleLogout = () => {
		try {
			axios.post(`http://localhost:3000/api/user/logout`);
			// Remove token from localStorage
			Cookies.remove('token');
			setIsAuthenticated(false);
			localStorage.removeItem('isAuthenticated');
			navigate('/');
		} catch (error) {
			console.log('Logout failed! ', error);
		}
	};

	return (
		<div className='sticky top-0 z-[10] shadow-xl w-full bg-white'>
			<div className='mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
				<div className='inline-flex items-center space-x-2'>
					<Link to='/'>
						<span className='font-bold'>AlumniAssociation.</span>
					</Link>
				</div>
				<div className='hidden grow items-start lg:flex'>
					<ul className='ml-12 inline-flex space-x-8 relative'>
						<li>
							<Link
								to='/'
								className='text-sm font-semibold text-gray-800 hover:text-gray-900'
							>
								Home
							</Link>
						</li>
						{localStorage.getItem('isAuthenticated') ? (
							<li>
								<Link
									to='/alumniDirectory'
									className='text-sm font-semibold text-gray-800 hover:text-gray-900'
								>
									Alumni Directory
								</Link>
							</li>
						) : (
							<li>
								<Link
									to='/signin'
									className='text-sm font-semibold text-gray-800 hover:text-gray-900'
								>
									Alumni Directory
								</Link>
							</li>
						)}
						<li className='relative'>
							{user?.role === 'STUDENT' ||
							user?.role === 'ALUMNI' || !localStorage.getItem('isAuthenticated') ? (
								<Link
									to='/news&events'
									className='text-sm font-semibold text-gray-800 hover:text-gray-900'
								>
									News & Events
								</Link>
							) : (
								<Link
									className='text-sm font-semibold text-gray-800 hover:text-gray-900 cursor-pointer'
									onClick={() =>
										setNewsEventsDropdown(
											!newsEventsDropdown
										)
									}
								>
									News & Events
								</Link>
							)}
						</li>
						{newsEventsDropdown && (
							<>
								<div className='absolute left-40 top-8 bg-white rounded-md shadow-md border'>
									<ul className=''>
										<Link>
											<li className='p-4 hover:bg-gray-100 rounded-t-md text-nowrap'>
												Add News & Events
											</li>
										</Link>
										<hr />
										<Link to='/news&events'>
											<li className='p-4 hover:bg-gray-100 rounded-b-md text-nowrap'>
												View News & Events
											</li>
										</Link>
									</ul>
								</div>
							</>
						)}
						{/* <li>
							<a
								href='/#contact'
								className='text-sm font-semibold text-gray-800 hover:text-gray-900'
							>
								Contact
							</a>
						</li> */}
					</ul>
				</div>
				<div className='hidden space-x-2 lg:block'>
					{isAuthenticated ? (
						<>
							<Link to='/profile'>
								<button
									type='button'
									className='rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
								>
									Profile
								</button>
							</Link>
							<Link onClick={handleLogout}>
								<button
									type='button'
									className='rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
								>
									Log Out
								</button>
							</Link>
						</>
					) : (
						<>
							<Link to='/signup'>
								<button
									type='button'
									className='rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
								>
									Sign Up
								</button>
							</Link>
							<Link to='/signin'>
								<button
									type='button'
									className='rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
								>
									Log In
								</button>
							</Link>
						</>
					)}
				</div>
				<div className='lg:hidden'>
					<Menu
						onClick={toggleMenu}
						className='h-6 w-6 cursor-pointer'
					/>
				</div>
				{isMenuOpen && (
					<div className='absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden'>
						<div className='divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
							<div className='px-5 pb-6 pt-5'>
								<div className='flex items-center justify-between'>
									<div className='inline-flex items-center space-x-2'>
										<Link to='/' className='font-bold' onClick={toggleMenu}>
											AlumniAssociation.
										</Link>
									</div>
									<div className='-mr-2'>
										<button
											type='button'
											onClick={toggleMenu}
											className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
										>
											<span className='sr-only'>
												Close menu
											</span>
											<X
												className='h-6 w-6'
												aria-hidden='true'
											/>
										</button>
									</div>
								</div>
								<div className='mt-6'>
									<nav className='grid gap-y-4'>
										<Link
											to='/'
											className='-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50'
											onClick={toggleMenu}
										>
											<span className='ml-3 text-base font-medium text-gray-900'>
												Home
											</span>
										</Link>
										<Link
											to='/alumniDirectory'
											className='-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50'
											onClick={toggleMenu}
										>
											<span className='ml-3 text-base font-medium text-gray-900'>
												Alumni Directory
											</span>
										</Link>
										<div className='relative'>
											{user?.role === 'STUDENT' ||
											user?.role === 'ALUMNI' ? (
												<Link
													to='/news&events'
													className='-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50'
													onClick={toggleMenu}
												>
													<span className='ml-3 text-base font-medium text-gray-900'>
														News & Events
													</span>
												</Link>
											) : (
												<Link
													className='-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50 cursor-pointer'
													onClick={() =>
														setNewsEventsDropdown(
															!newsEventsDropdown
														)
													}
												>
													<span className='ml-3 text-base font-medium text-gray-900'>
														News & Events
													</span>
												</Link>
											)}
										</div>
											{newsEventsDropdown && (
												<>
													<div className='w-full bg-white rounded-md shadow-md border'>
														<ul className=''>
															<Link onClick={toggleMenu}>
																<li className='p-4 hover:bg-gray-100 rounded-t-md'>
																	Add News &
																	Events
																</li>
															</Link>
															<hr />
															<Link to='/news&events' onClick={toggleMenu}>
																<li className='p-4 hover:bg-gray-100 rounded-b-md'>
																	View News & Events
																</li>
															</Link>
														</ul>
													</div>
												</>
											)}
										{/* <Link
											to='/#contact'
											className='-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50'
										>
											<span className='ml-3 text-base font-medium text-gray-900'>
												Contact
											</span>
										</Link> */}
									</nav>
								</div>
								<div className='mt-5 space-y-2'>
									{isAuthenticated ? (
										<>
											<Link to='/profile'>
												<button
													type='button'
													className='w-full rounded-md border border-black px-3 py-2 mb-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
													onClick={toggleMenu}
												>
													Profile
												</button>
											</Link>
											<Link onClick={handleLogout}>
												<button
													type='button'
													className='w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
													onClick={toggleMenu}
												>
													Log Out
												</button>
											</Link>
										</>
									) : (
										<>
											<Link to='/signup'>
												<button
													type='button'
													className='w-full rounded-md border border-black px-3 py-2 mb-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
													onClick={toggleMenu}
												>
													Sign Up
												</button>
											</Link>
											<Link to='/signin'>
												<button
													type='button'
													className='w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
													onClick={toggleMenu}
												>
													Log In
												</button>
											</Link>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
