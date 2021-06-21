module.exports = class Commands {
	constructor(client) {
		this.client = client;
		this.aliases = ["help"];
	}

	run({ message }) {
		message.reply(`my command list:\n${this.client.commands.map(command => command.constructor).join(", ")}.`);
	}
};