import React, { useState, useEffect } from 'react';
import { FiSend, FiImage, FiFile, FiSmile } from 'react-icons/fi';
import { IoMdNotifications } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';
import { useStore } from '../store';

const Chat = () => {
	const { userDetails } = useStore();
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const [onlineUsers, setOnlineUsers] = useState([]);

	useEffect(() => {
		// Simulating real-time updates
		const interval = setInterval(() => {
			const newMessage = {
				id: Date.now(),
				text: 'New message arrived!',
				sender: 'John Doe',
				timestamp: new Date().toLocaleTimeString(),
				isReceived: true,
			};
			setMessages((prevMessages) => [...prevMessages, newMessage]);
			playNotificationSound();
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		setOnlineUsers({ id: 1, name: 'John Doe' });
	}, []);

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (inputMessage.trim() !== '') {
			const newMessage = {
				id: Date.now(),
				text: inputMessage,
				sender: 'You',
				timestamp: new Date().toLocaleTimeString(),
				isReceived: false,
			};
			setMessages((prevMessages) => [...prevMessages, newMessage]);
			setInputMessage('');
			setIsTyping(false);
		}
	};

	const handleInputChange = (e) => {
		setInputMessage(e.target.value);
		setIsTyping(e.target.value.trim() !== '');
	};

	const playNotificationSound = () => {
		// Implement sound notification logic here
	};

	return (
		<div className="lg:w-[60%] w-full mx-auto border">
			<div className='flex min-h-[93vh] max-h-[93vh] bg-gray-100'>
				<div className='w-1/4 bg-white border-r border-gray-300 p-4 hidden sm:block'>
					<h2 className='text-xl font-bold mb-4'>User</h2>
					<ul>
						<li
							key={userDetails?.id}
							className='flex items-center mb-2 p-2 bg-gray-100 rounded cursor-pointer'
						>
							<AiOutlineUser className='text-gray-500 mr-2' />
							<span className='font-medium'>{userDetails?.name}</span>
						</li>
				</ul>
				</div>
				<div className='flex-1 flex flex-col'>
					<div className='bg-white border-b border-gray-300 p-4 flex items-center justify-between'>
						<h1 className='text-2xl font-bold'>John Doe</h1>
					</div>
					<div className='flex-1 overflow-y-auto p-4' aria-live='polite'>
						{messages.map((message) => (
							<div
								key={message.id}
								className={`flex ${
									message.isReceived
										? 'justify-start'
										: 'justify-end'
								} mb-4`}
							>
								<div
									className={`rounded-lg p-3 max-w-xs lg:max-w-md ${
										message.isReceived
											? 'bg-gray-200'
											: 'bg-blue-500 text-white'
									}`}
								>
									<p className='font-bold'>{message.sender}</p>
									<p>{message.text}</p>
									<p className='text-xs text-gray-500 mt-1'>
										{message.timestamp}
									</p>
								</div>
							</div>
						))}
					</div>
					<div className='bg-white border-t border-gray-300 p-4'>
						{isTyping && (
							<div className='text-sm text-gray-500 mb-2'>
								Someone is typing...
							</div>
						)}
						<form action='' method='' className='flex items-center'>
							<input
								type='text'
								value={inputMessage}
								onChange={handleInputChange}
								placeholder='Type a message...'
								className='flex-1 border rounded-full py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
								aria-label='Type a message'
							/>
							<button
								onClick={handleSendMessage}
								className='bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
								aria-label='Send message'
							>
								<FiSend />
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;
