import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaNetworkWired, FaBriefcase, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';
import { IoIosArrowUp } from 'react-icons/io';

const Home = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Welcome Section */}
      <section id="home" className="relative h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Z3JvdXB8fHx8fHwxNjg0NzE3MTM3&ixlib=rb-4.0.3&q=80&w=1080" alt="Diverse group of alumni" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Welcome Alumni!</h2>
          <p className="text-xl md:text-2xl mb-8">Connecting the past, present, and future</p>
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">Learn More</Link>
        </div>
      </section>

	  {/* Benefits Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <FaNetworkWired className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Networking Opportunities</h3>
              <p>Connect with fellow alumni and expand your professional network</p>
            </div>
            <div className="text-center">
              <FaBriefcase className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Career Support</h3>
              <p>Access job boards, career counseling, and professional development resources</p>
            </div>
            <div className="text-center">
              <FaCalendarAlt className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Exclusive Events</h3>
              <p>Participate in alumni-only events, reunions, and workshops</p>
            </div>
            <div className="text-center">
              <FaGraduationCap className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Lifelong Learning</h3>
              <p>Enjoy continued education opportunities and access to university resources</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((event) => (
              <div key={event} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105">
                <img src={`https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZXZlbnR8fHx8fHwxNjg0NzE3MTM4&ixlib=rb-4.0.3&q=80&w=400`} alt={`Event ${event}`} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Alumni Networking Night</h3>
                  <p className="text-gray-600 mb-4">Join us for an evening of networking and reconnecting with fellow alumni.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-medium">20 September, 2024</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">Register</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">View All Events</a>
          </div>
        </div>
      </section>

      {/* Alumni Success Stories Section */}
      <section id="stories" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Alumni Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((story) => (
              <div key={story} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105">
                <img src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cG9ydHJhaXR8fHx8fHwxNjg0NzE3MTM5&ixlib=rb-4.0.3&q=80&w=300`} alt={`Alumni ${story}`} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Harman</h3>
                  <p className="text-gray-600 mb-4">"The alumni network has been instrumental in my career growth. I'm grateful for the connections and opportunities it has provided."</p>
                  <span className="text-blue-600 font-medium">Class of 2010</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

	  {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Alumni Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="mb-4">"Joining the alumni association has been one of the best decisions I've made. The networking opportunities have been invaluable for my career."</p>
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Sarah Thompson" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">Sarah Thompson</h4>
                  <p className="text-sm text-gray-600">Class of 2015</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="mb-4">"The alumni events have helped me stay connected with my alma mater and make new friends long after graduation."</p>
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Michael Chen" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">Michael Chen</h4>
                  <p className="text-sm text-gray-600">Class of 2008</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="mb-4">"I'm grateful for the career support provided by the association. It has been crucial in helping me navigate job transitions."</p>
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="David Wilson" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">David Wilson</h4>
                  <p className="text-sm text-gray-600">Class of 2012</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
              <p className="mb-4">Feel free to reach out to us with any questions or concerns.</p>
              <ul className="space-y-2">
                <li>Email: info@alumnassociation.com</li>
                <li>Phone: 99999-99999</li>
                <li>Address: Thapar Polytechnic College, Patiala</li>
              </ul>
              <div className="mt-6 flex space-x-4">
                <a href="https://facebook.com/" target='_blank' className="text-blue-600 hover:text-blue-800 transition duration-300"><FaFacebook size={24} /></a>
                <a href="https://x.com/" target='_blank' className="text-blue-600 hover:text-blue-800 transition duration-300"><FaTwitter size={24} /></a>
                <a href="https://linkedin.com/" target='_blank' className="text-blue-600 hover:text-blue-800 transition duration-300"><FaLinkedin size={24} /></a>
                <a href="https://instagram.com/" target='_blank' className="text-blue-600 hover:text-blue-800 transition duration-300"><FaInstagram size={24} /></a>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                <input type="text" id="name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                <input type="email" id="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" required />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1 font-medium">Message</label>
                <textarea id="message" rows="4" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" required></textarea>
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">Send Message</button>
            </form>
          </div>
        </div>
      </section>

	  {/* Call-to-Action Section */}
      <section className="py-16 bg-white text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8">Stay connected, advance your career, and make a difference!</p>
          <Link to="/signup" className="text-blue-600 px-8 py-3 rounded-full font-bold text-lg bg-blue-100 transition duration-300 inline-block mb-8">Become a Member</Link>
        </div>
      </section>

      {/* Back to Top Button */}
      {/* <button onClick={scrollToTop} className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition duration-300" aria-label="Back to top">
        <IoIosArrowUp size={24} />
      </button> */}
    </>
  );
};

export default Home;
