import React from 'react';

const DisplayPlayers = ({ players, words, player }) => {
	return (
		<>
			{players.map((el, index) => {
				return el.socketID === player.socketID && el.WPM !== -1 ? (
					<h3>Congrats! {index + 1} place</h3>
				) : null;
			})}
			{players.map((el) => (
				<div style={{ position: 'relative' }}>
					{el.nickName}
					<span
						style={{
							position: 'absolute',
							backgroundColor: 'red',
							height: '20px',
							width: '20px',
							left: `${(el.currentWordIndex / words.length) * 100}%`,
						}}
					/>
				</div>
			))}
		</>
	);
};

export default DisplayPlayers;
