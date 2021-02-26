import React, { useState, useEffect } from 'react';
import CountDown from './CountDown';
import DisplayWords from './DisplayWords';
import StartButton from './StartButton';
import Form from './Form';
import { Redirect, useHistory } from 'react-router-dom';
import socket from '../socketConfig';
import DisplayPlayers from './DisplayPlayers';
import Chat from './Chat';

const Game = ({ gameState }) => {
	const { _id, words, players, isOver } = gameState;
	const player = players.find((el) => el.socketID === socket.id);
	return (
		<>
			{isOver && <h3>The race has ended</h3>}
			{_id === '' ? (
				<Redirect to='/' />
			) : (
				<div>
					<CountDown />
					{/* <DisplayWords words={words} player={player} /> */}
					<Form gameID={_id} words={words} player={player} />
					<DisplayPlayers players={players} player={player} words={words} />
					<StartButton gameID={_id} />
					<Chat gameID={_id} player={player} />
				</div>
			)}
		</>
	);
};

export default Game;
