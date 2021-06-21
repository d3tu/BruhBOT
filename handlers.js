const { readdirSync } = require("fs"),
lcdb = require("lcdb");

class EventManager {
	constructor(client) {
		this.client = client;
		this._runEvents();
	}
	
	_runEvents() {
		readdirSync("./events").forEach(fileName => {
			if (!fileName.endsWith(".js")) return;
			const Event = require("./events/" + fileName),
			event = new Event(this.client);
			this.client.on(fileName, ...args => event.run(...args));
		});
	}
}

class CommandManager {
	constructor(client) {
		client.commands = [];
		this.client = client;
		this._runCommands();
	}
	
	_runCommands() {
		readdirSync("./commands").forEach(fileName => {
			if (!fileName.endsWith(".js")) return;
			const Command = require("./commands/" + fileName),
			command = new Command(this.client);
			this.client.commands.push(command);
		});
	}
}

class Database {
	constructor(client) {
		client.database = null;
		this.client = client;
		this.databases = {};
		this._runDatabase();
	}
	
	_runDatabase() {
		this.client.database = function database(reference) {
			reference = "./databases/" + reference;
			if (!this.databases[reference]) this.databases[reference] = lcdb(reference);
			return this.databases[reference];
		}
	}
}

module.exports = {
	EventManager,
	CommandManager,
	Database
};