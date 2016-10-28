const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const nodeSass = require('node-sass-middleware');
const expressHandlebars = require('express-handlebars');

const PORT = process.env.PORT || 80;
const HOST = '0.0.0.0';

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(nodeSass({
    src: __dirname + '/sass',
    dest: __dirname + '/public/css',
    debug: false,
    indentedSyntax: true,
    outputStyle: 'compressed',
    prefix: '/css'
}));

app.use(express.static('public'));

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/:page', (req, res) => {
    res.render(req.params.page.toString().trim().toLowerCase(), {
        title: req.params.page.toString().trim()
    });
});

app.get('/', (req, res) => {
    return res.render('index', {
        title: 'Home'
    });
});

app.use((err, req, res, next) => {
	console.error('Unexpected error', err);
    if (err.message.search(/Failed to lookup view "(.*)" in views directory/g) > -1 || err.status === 404)
		return res.status(404).render('404', {
	        title: '404 Not Page Found',
	        url: req.url
	    });
	else
    	return res.status(500).send('An unexpected error occured.');
});

app.listen(PORT, HOST, () => {
    console.log(`syfy-website listening on http://${HOST}:${PORT}`);
});
