import React, { useState } from 'react';
import socket from '../socketConfig';

const Random = () => {
	const [nickName, setNickName] = useState('');

	const onClick = (e) => {
		e.preventDefault();
		console.log('name is:', nickName);
		socket.emit('join-random', nickName);
	};

	return (
		<form>
			<input
				onChange={(e) => setNickName(e.target.value)}
				placeholder='your nick name'
				type='text'
			/>
			<button onClick={onClick}>enter random lobby</button>
		</form>
	);
};

export default Random;
