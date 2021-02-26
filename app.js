const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const QuotableAPI = require('./QuotableAPI');

const app = express();
const port = 3001;
const server = app.listen(port);

const io = socketio(server, {
	cors: {
		origin: '*',
	},
});

const Game = require('./models/Game');

app.use(cors());

mongoose
	.connect(
		'mongodb+srv://dzoni:dzonisifra@cluster0.xn0bo.mongodb.net/typeracernew?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log('Connected to database...'));

io.on('connect', (socket) => {
	socket.on('create-game', async (nickName) => {
		let game = new Game();

		const quotes = await QuotableAPI();
		socket.join(game._id.toString());
		socket.roomID = game._id.toString();
		game.isPrivate = true;
		game.words = quotes;
		game.players.push({ nickName, socketID: socket.id, isPartyLeader: true });
		game = await game.save();
		socket.emit('update-game', game);
	});

	socket.on('disconnect', async () => {
		let game = await Game.findById(socket.roomID);
		if (game) {
			game.players = game.players.filter(
				(player) => player.socketID !== socket.id
			);
			if (!io.sockets.adapter.rooms.get(socket.roomID)) {
				game.isOver = true;
			}
			game = await game.save();
			io.to(game._id.toString()).emit('update-game', game);
		}
	});

	socket.on('message', async ({ message, gameID, nickName }) => {
		io.to(gameID).emit('message', { newMessage: message, nickName });
	});

	socket.on('join-random', async (nickName) => {
		let room = await Game.findOne({
			isOpen: true,
			isOver: false,
			isPrivate: false,
			'players.5': { $exists: false },
		});
		if (!room) {
			const quotes = await QuotableAPI();
			let game = new Game();
			socket.join(game._id.toString());
			socket.roomID = game._id.toString();
			game.words = quotes;
			game.players.push({ nickName, socketID: socket.id, isPartyLeader: true });
			game = await game.save();
			socket.emit('update-game', game);
		} else {
			socket.join(room._id.toString());
			socket.roomID = room._id.toString();
			room.players.push({ nickName, socketID: socket.id });
			room = await room.save();
			io.to(room._id.toString()).emit('update-game', room);
		}
	});

	socket.on('join-game', async ({ gameID, nickName }) => {
		socket.join(gameID.toString());
		let game = await Game.findById(gameID);
		game.players.push({ nickName, socketID: socket.id });
		game = await game.save();
		io.to(gameID).emit('update-game', game);
	});

	socket.on('timer', async (gameID) => {
		let time = 5;
		let gameTime = 15;
		let game = await Game.findById(gameID);
		game.startTime = Date.now() + time * 1000;
		game.isOpen = false;
		game = await game.save();

		let player = game.players.find((el) => el.socketID === socket.id);

		let timerID = setInterval(async () => {
			if (time >= 0) {
				io.to(gameID).emit('timer', time);
				time--;
			} else {
				if (gameTime >= 0) {
					io.to(gameID).emit('timer', gameTime);
					gameTime--;
				} else {
					game = await Game.findById(gameID);
					game.isOver = true;
					game.players.forEach((el) => {
						if (el.WPM === -1) {
							const calcWPM = Math.round((el.currentWordIndex / 15) * 60);
							el.WPM = calcWPM;
						}
					});
					game.players.sort((a, b) => b.WPM - a.WPM);
					io.to(gameID).emit('update-game', game);
					game = await game.save();
					clearInterval(timerID);
				}
			}
		}, 1000);
	});

	socket.on('input', async ({ input, gameID }) => {
		let game = await Game.findById(gameID);
		let player = game.players.find((el) => el.socketID === socket.id);
		if (game.words[player.currentWordIndex] === input) {
			if (game.words.length !== player.currentWordIndex + 1) {
				console.log(game.words.length, player.currentWordIndex);
				player.currentWordIndex++;
				game = await game.save();
				io.to(gameID).emit('update-game', game);
			} else {
				//Calc WPM
				let timePast = Date.now() - game.startTime;
				const calcWPM = Math.round(
					(game.words.length / (timePast / 1000)) * 60
				);
				console.log(calcWPM);
				player.WPM = calcWPM;
				game = await game.save();
				socket.emit('done');
				io.to(gameID).emit('update-game', game);
			}
		}
	});
});
