import React from 'react';

const DisplayWords = ({ input, words, player }) => {
	const wordsToBeTyped = (words, player) => {
		return words.slice(player.currentWordIndex + 1, words.length).join(' ');
	};

	const typedWords = (words, player) => {
		return words.slice(0, player.currentWordIndex).join(' ');
	};

	const currentWord = (words, player) => {
		let lettersToBeTyped = words[player.currentWordIndex].slice(
			input.length,
			words[player.currentWordIndex].length + 1
		);
		let wordsSentence = words.join(' ');
		let typedLetters;

		// console.log(typedLetters, lettersToBeTyped);
		// console.log(words[player.currentWordIndex].charAt(input.length));
		// console.log(
		// 	words[player.currentWordIndex].slice(
		// 		input.length,
		// 		words[player.currentWordIndex].length + 1
		// 	)
		// );
		if (input === wordsSentence.slice(0, input.length)) {
			typedLetters = input;
		}
		return words[player.currentWordIndex];
	};

	return (
		<>
			<span style={{ backgroundColor: 'green' }}>
				{`${typedWords(words, player)} `}
			</span>
			<span style={{ backgroundColor: 'yellow' }}>
				{`${currentWord(words, player)} `}
			</span>
			<span style={{ backgroundColor: 'pink' }}>
				{wordsToBeTyped(words, player)}
			</span>
		</>
	);
};

export default DisplayWords;
