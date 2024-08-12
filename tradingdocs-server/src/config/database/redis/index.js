const Redis = require("ioredis");
const client = new Redis({
	host: "localhost",
	port: 6379,
	retryStrategy: (times) => {
		return Math.min(times * 50, 2000);
	},
	maxRetriesPerRequest: 5,
});

module.exports = client;
