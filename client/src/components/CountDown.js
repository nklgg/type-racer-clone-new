import React, { useEffect, useState } from 'react';
import socket from '../socketConfig';

const CountDown = () => {
	const [timer, setTimer] = useState(0);
	useEffect(() => {
		socket.on('timer', (time) => {
			console.log('time', time);
			setTimer(time);
		});
	}, []);

	return <div>{timer}</div>;
};

export default CountDown;
