import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const Menu = () => {
	let history = useHistory();
	return (
		<div>
			<button onClick={() => <Redirect to='/mkay' />}>clck</button>
			<Link to='/game/create'>create game</Link>
			<Link to='/game/join'>join game</Link>
			<Link to='/game/random'>join random loby</Link>
		</div>
	);
};

export default Menu;
