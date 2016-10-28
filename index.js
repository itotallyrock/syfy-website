const express = require('express');
const app = express();
const nodeSass = require('node-sass-middleware');

const PORT = process.env.PORT || 80;
const HOST = '0.0.0.0';

app.use(nodeSass({
	src: __dirname + '/sass',
	dest: __dirname + '/public/css',
	debug: true,
	indentedSyntax: true,
	outputStyle: 'compressed',
	prefix: '/css'
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

app.listen(PORT, HOST, () => {
	console.log(`syfy-website listening on http://${HOST}:${PORT}`);
});
