let connects = [];

function websocket(ws, req) {
	connects.push(ws);
	
	ws.on('open', (s) => {
		console.log('Connected -', s);
	});

	ws.on('message', (msg) => {
		console.log('Received -', msg);
		console.log(connects.length);

		const data = JSON.parse(msg);

		connects.forEach((socket) => {
			socket.send(JSON.stringify(data));
		});
	});

	ws.on('close', () => {
		connects = connects.filter((conn) => {
			return conn === ws ? false : true;
		});
	});

	ws.on('error', (error) => {
		console.log(error);
	});
}

module.exports = {
	websocket
}
