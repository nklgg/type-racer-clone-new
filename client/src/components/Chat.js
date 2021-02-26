import React, { useState, useEffect } from 'react';
import socket from '../socketConfig';

const Chat = ({ gameID, player }) => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	const onChange = (e) => {
		setMessage(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		socket.emit('message', { message, gameID, nickName: player.nickName });
	};

	useEffect(() => {
		socket.on('message', ({ newMessage, nickName }) => {
			console.log(newMessage, nickName);
			setMessages((messages) => [...messages, { newMessage, nickName }]);
		});

		return () => socket.removeAllListeners();
	}, []);

	return (
		<>
			<h3>ALL MESSAGES</h3>
			{messages.map((msg) => (
				<p>
					{msg.nickName}: {msg.newMessage}
				</p>
			))}
			<form onSubmit={onSubmit}>
				<input
					type='text'
					placeholder='Enter your message...'
					onChange={onChange}
				/>
			</form>
		</>
	);
};

export default Chat;
