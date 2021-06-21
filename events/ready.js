module.exports = class Ready {
	constructor(client) {
		this.client = client;
	}
	
	run() {
		console.log("logged on", this.client.user.tag);
	}
};