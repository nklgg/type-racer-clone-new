import React, { useState, useEffect } from 'react';

const DisplayWords = ({ input, words, player }) => {
	const [typed, setTyped] = useState('');

	useEffect(() => {
		console.log(typed);
		if (input === words[player.currentWordIndex].slice(0, input.length)) {
			setTyped(input);
		}
	}, [input]);

	const wordsToBeTyped = (words, player) => {
		return words.slice(player.currentWordIndex + 1, words.length).join(' ');
	};

	const typedWords = (words, player) => {
		return words.slice(0, player.currentWordIndex).join(' ');
	};

	const currentWord = (words, player) => {
		let typedLetters = '';
		let lettersToBeTyped = words[player.currentWordIndex];
		if (input === words[player.currentWordIndex].slice(0, input.length)) {
			// setTyped(input);
			typedLetters = input;
			lettersToBeTyped = words[player.currentWordIndex].slice(
				input.length,
				words[player.currentWordIndex].length
			);
		}
		// console.log(typedLetters, lettersToBeTyped);
		// return words[player.currentWordIndex];
		return (
			<>
				<span style={{ backgroundColor: 'green' }}>{typedLetters}</span>
				<span>{`${lettersToBeTyped} `}</span>
			</>
		);
	};

	return (
		<>
			<span style={{ backgroundColor: 'green' }}>
				{`${typedWords(words, player)} `}
			</span>

			{currentWord(words, player)}
			<span style={{ backgroundColor: 'pink' }}>
				{wordsToBeTyped(words, player)}
			</span>
		</>
	);
};

export default DisplayWords;
