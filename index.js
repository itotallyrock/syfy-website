const express = require('express');
const app = express();

const PORT = process.env.PORT || 80;
const HOST = '0.0.0.0';

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

app.listen(PORT, HOST, () => {
	console.log(`syfy-website listening on http://${HOST}:${PORT}`);
});


