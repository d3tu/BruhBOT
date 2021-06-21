const { Client } = require("discord.js"),
{ EventManager, CommandManager, Database } = require("./handlers.js"),
config = require("./config.json");

class Bot extends Client {
	constructor() {
		super();
		this.config = config;
	}
	
	_handlers() {
		const client = this;
		delete client.config.token;
		new EventManager(client);
		new CommandManager(client);
		new Database(client);
	}
	
	connect() {
		super.login(this.client.config.token).then(() => this.handlers());
	}
}

new Bot().connect();