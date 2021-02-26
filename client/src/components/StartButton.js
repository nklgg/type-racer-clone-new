import React, { useEffect } from 'react';
import socket from '../socketConfig';

const StartButton = ({ gameID }) => {
	const onClick = (e) => {
		socket.emit('timer', gameID);
	};

	return <button onClick={onClick}>start game</button>;
};

export default StartButton;
