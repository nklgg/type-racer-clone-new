import React, { useState } from 'react';
import socket from '../socketConfig';

const JoinGame = () => {
	const [input, setInput] = useState();

	const onChange = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
		console.log(input);
	};

	const onClick = (e) => {
		e.preventDefault();
		socket.emit('join-game', input);
		console.log(input);
	};

	return (
		<div>
			<form>
				<input
					onChange={onChange}
					name='gameID'
					type='text'
					placeholder='enter your game ID'
				/>
				<input
					onChange={onChange}
					name='nickName'
					type='text'
					placeholder='enter your name'
				/>
				<button onClick={(e) => onClick(e)}>join game</button>
			</form>
		</div>
	);
};

export default JoinGame;
