import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';

const NewsEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);
  const [visibleEventsCount, setVisibleEventsCount] = useState(3);
  const [loading, setLoading] = React.useState(false);

  const newsRef = useRef(null);

  const newsData = [
    {
      id: 1,
      title: 'New Breakthrough in Renewable Energy',
      image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      excerpt: 'Scientists have made a groundbreaking discovery in the field of renewable energy, potentially revolutionizing how we harness solar power.',
    },
    {
      id: 2,
      title: 'Global Tech Conference Announces Keynote Speakers',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80',
      excerpt: 'The annual Global Tech Conference has revealed its impressive lineup of keynote speakers, including industry leaders and innovators.',
    },
    {
      id: 3,
      title: 'New Study Shows Benefits of Meditation',
      image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      excerpt: 'A recent study has found significant cognitive and health benefits associated with regular meditation practice.',
    },
    {
      id: 4,
      title: 'Major Breakthrough in Quantum Computing',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      excerpt: 'Researchers have achieved a significant milestone in quantum computing, bringing us closer to practical applications.',
    },
    {
      id: 5,
      title: 'New AI Model Revolutionizes Natural Language Processing',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      excerpt: 'A cutting-edge AI model has been developed that significantly improves natural language understanding and generation.',
    },
  ];

  const eventsData = [
    {
      id: 1,
      title: 'Annual Tech Summit',
      date: '2023-09-15',
      location: 'San Francisco, CA',
      description: 'Join industry leaders for our annual tech summit featuring keynote speeches, workshops, and networking opportunities.',
    },
    {
      id: 2,
      title: 'AI and Machine Learning Conference',
      date: '2023-10-22',
      location: 'New York, NY',
      description: 'Explore the latest advancements in AI and machine learning with expert presentations and hands-on demonstrations.',
    },
    {
      id: 3,
      title: 'Global Sustainability Forum',
      date: '2023-11-05',
      location: 'London, UK',
      description: 'A gathering of thought leaders and innovators discussing solutions for a sustainable future.',
    },
    {
      id: 4,
      title: 'Blockchain and Cryptocurrency Expo',
      date: '2023-12-01',
      location: 'Tokyo, Japan',
      description: 'Dive into the world of blockchain technology and cryptocurrencies with industry experts and innovators.',
    },
    {
      id: 5,
      title: 'Virtual Reality Developer Conference',
      date: '2024-01-20',
      location: 'Los Angeles, CA',
      description: 'Connect with VR developers, designers, and entrepreneurs to explore the future of immersive technologies.',
    },
  ];

  const filteredNews = newsData.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEvents = eventsData.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrevNews = () => {
    setActiveNewsIndex((prevIndex) =>
      prevIndex === 0 ? filteredNews.length - 1 : prevIndex - 1
    );
  };

  const handleNextNews = () => {
    setActiveNewsIndex((prevIndex) =>
      prevIndex === filteredNews.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handlePrevNews();
      } else if (event.key === 'ArrowRight') {
        handleNextNews();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">News and Events</h1>
      
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search news and events..."
            className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>
      </div>

      <div className="lg:flex lg:space-x-8">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
          <div className="relative" ref={newsRef}>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${activeNewsIndex * 100}%)` }}
              >
                {filteredNews.map((news, index) => (
                  <div key={news.id} className="w-full flex-shrink-0 rounded-lg">
                    <div className="bg-white rounded-lg hover:shadow-md border overflow-hidden">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                        <p className="text-gray-600 mb-4">{news.excerpt}</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md focus:outline-none"
              onClick={handlePrevNews}
              aria-label="Previous news"
            >
              <FiChevronLeft className="text-2xl" />
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md focus:outline-none"
              onClick={handleNextNews}
              aria-label="Next news"
            >
              <FiChevronRight className="text-2xl" />
            </button>
          </div>
          {/* {filteredNews.length > visibleNewsCount && (
            <div className="text-center mt-4">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors duration-300"
                onClick={() => setVisibleNewsCount(prevCount => prevCount + 3)}
              >
                Load More
              </button>
            </div>
          )} */}
        </div>

        <div className="lg:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {filteredEvents.slice(0, visibleEventsCount).map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <IoCalendarOutline className="mr-2" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <IoLocationOutline className="mr-2" />
                  <span>{event.location}</span>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
                  Learn More
                </button>
              </div>
            ))}
          </div>
          {filteredEvents.length > visibleEventsCount && (
            <div className="text-center mt-4">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors duration-300"
                onClick={() => setVisibleEventsCount(prevCount => prevCount + 3)}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsEvents;