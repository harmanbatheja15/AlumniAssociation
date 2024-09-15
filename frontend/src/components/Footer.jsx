import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<>
			<footer className='bg-gray-800 text-white py-8'>
				<div className='container mx-auto px-4'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<div>
							<h3 className='text-xl font-semibold mb-4'>
								Quick Links
							</h3>
							<ul className='space-y-2'>
								<li>
									<Link
										to='/'
										className='hover:text-blue-300 transition duration-300'
									>
										Home
									</Link>
								</li>
								<li>
									<Link
										to='/alumniDirectory'
										className='hover:text-blue-300 transition duration-300'
									>
										Alumni Directory
									</Link>
								</li>
								<li>
									<Link
										to='/'
										className='hover:text-blue-300 transition duration-300'
									>
										Events
									</Link>
								</li>
								<li>
									<a
										href='/#contact'
										className='hover:text-blue-300 transition duration-300'
									>
										Contact
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className='text-xl font-semibold mb-4'>
								Legal
							</h3>
							<ul className='space-y-2'>
								<li>
									<a
										href='/'
										className='hover:text-blue-300 transition duration-300'
									>
										Privacy Policy
									</a>
								</li>
								<li>
									<a
										href='/'
										className='hover:text-blue-300 transition duration-300'
									>
										Terms of Service
									</a>
								</li>
								<li>
									<a
										href='/'
										className='hover:text-blue-300 transition duration-300'
									>
										Cookie Policy
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className='text-xl font-semibold mb-4'>
								Newsletter
							</h3>
							<p className='mb-4'>
								Stay updated with our latest news and events.
							</p>
							<form className='flex'>
								<input
									type='email'
									placeholder='Enter your email'
									className='w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600'
									required
								/>
								<button
									type='submit'
									className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md transition duration-300'
								>
									Subscribe
								</button>
							</form>
						</div>
					</div>
					<div className='mt-8 pt-8 border-t border-gray-700 text-center'>
						<p>
							&copy; 2024 Alumni Association. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
