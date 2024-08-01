const Redis = require("ioredis");
const client = new Redis({
	host: "localhost", // hoặc địa chỉ IP của Redis server
	port: 6379, // cổng mặc định của Redis
	retryStrategy: (times) => {
		// Thử lại sau mỗi 2 giây
		return Math.min(times * 50, 2000);
	},
	maxRetriesPerRequest: 5, // giảm số lần thử lại xuống 5
});

module.exports = client;
