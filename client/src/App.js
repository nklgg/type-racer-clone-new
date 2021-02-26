import React, { useEffect, useState } from 'react';
import socket from './socketConfig';
import { Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import Game from './components/Game';
import { Router } from 'react-router-dom';
import Random from './components/Random';
import history from './components/history';

const App = () => {
	const [gameState, setGameState] = useState({
		_id: '',
		isOpen: false,
		players: [],
		words: [],
	});
	useEffect(() => {
		socket.on('update-game', (game) => {
			setGameState(game);
		});
		return () => {
			socket.removeAllListeners();
		};
	}, []);

	useEffect(() => {
		gameState._id !== '' && history.push('/game/race');
	}, [gameState._id]);

	return (
		<Router history={history}>
			<Switch>
				<Route exact path='/' component={Menu} />
				<Route exact path='/game/create' component={CreateGame} />
				<Route exact path='/game/join' component={JoinGame} />
				<Route exact path='/game/random' component={Random} />
				<Route
					exact
					path='/game/race'
					render={(props) => <Game {...props} gameState={gameState} />}
				/>
			</Switch>
		</Router>
	);
};

export default App;
