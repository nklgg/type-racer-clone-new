const axios = require('axios');

const uri = 'http://api.quotable.io/random';

module.exports = getData = async () => {
	const res = await axios.get(uri);
	return res.data.content.split(' ');
};
