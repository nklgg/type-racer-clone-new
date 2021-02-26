import React, { useState } from 'react';
import socket from '../socketConfig';
import { Redirect } from 'react-router-dom';

const CreateGame = () => {
	const [nickName, setNickName] = useState('');

	const onClick = (e) => {
		e.preventDefault();
		socket.emit('create-game', nickName);
	};

	return (
		<div>
			<button onClick={() => <Redirect to='/' />}>redirect</button>
			<form>
				<input
					onChange={(e) => setNickName(e.target.value)}
					type='text'
					placeholder='enter your nickname'
				/>
				<button onClick={onClick}>create game</button>
			</form>
		</div>
	);
};

export default CreateGame;
