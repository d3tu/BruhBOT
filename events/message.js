module.exports = class Message {
	constructor(client) {
		this.client = client;
	}
	
	run(message) {
		if ([`<@${this.client.user.id}>`, `<@${this.client.user.id}>`].includes(message.content)) return message.reply("my prefix is: " + this.client.config.prefix);
		
		if (!message.guild || message.author.bot || message.content.toLowerCase().startsWith(this.client.config.prefix.toLowerCase())) return;
		
		const args = message.content.slice(this.client.config.prefix.length).split(/ /g),
		cmdName = args.shift().trim().toLowerCase(),
		command = cmdName.length && this.client.commands.find(cmd => cmd.constructor.name.toLowerCase === cmdName || cmd.aliases.find(aliase => aliase === cmdName));
		
		command && command.run({ message, args });
	}
}