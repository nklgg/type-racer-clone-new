import React, { useState, useEffect } from 'react';
import DisplayWords from './DisplayWords';
import socket from '../socketConfig';

const Form = ({ gameID, words, player }) => {
	const [input, setInput] = useState('');
	const [isFinished, setIsFinished] = useState(false);

	useEffect(() => {
		socket.on('done', () => {
			setIsFinished(true);
		});
		return () => socket.removeAllListeners();
	}, []);

	const onChange = (e) => {
		setInput(e.target.value);
		console.log(e.target.value);
		if (e.target.value[e.target.value.length - 1] === ' ') {
			socket.emit('input', { input, gameID });
			e.target.value = '';
		}
	};

	return (
		<>
			{!isFinished && (
				<>
					<DisplayWords input={input} words={words} player={player} />
					<form>
						<input onChange={(e) => onChange(e)} type='text' />
					</form>
				</>
			)}
		</>
	);
};

export default Form;
