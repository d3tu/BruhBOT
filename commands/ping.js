module.exports = class Ping {
	constructor(client) {
		this.client = client;
	}
	
	run({ message }) {
		message.reply(`Pong!\nWebSocket ping: \`${this.client.ws.ping}ms\`.`);
	}
};