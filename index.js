const path = require('path');
const express = require('express');
const app = express();
const nodeSass = require('node-sass-middleware');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressHandlebars = require('express-handlebars');

const PORT = process.env.PORT || 80;
const HOST = '0.0.0.0';

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(nodeSass({
    src: path.join(__dirname, '/sass'),
    dest: path.join(__dirname, '/public/css'),
    debug: false,
    indentedSyntax: true,
    outputStyle: 'compressed',
    prefix: '/css'
}));

app.use(express.static('public'));

app.engine('handlebars', expressHandlebars({
    layoutsDir: path.join(__dirname, './views/layouts/'),
    partialsDir: path.join(__dirname, './views/partials/'),
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/faq', (req, res) => {
	return res.render('faq', {
		title: 'Frequently Asked Questions'
	});
});

app.get('/contact', (req, res) => {
	return res.render('contact', {
		title: 'Contact'
	});
});

app.post('/contact', (req, res) => {
	return res.send('Contacted');
});

app.get('/about', (req, res) => {
	return res.render('about', {
		title: 'About'
	});
});

app.get('/pricing', (req, res) => {
	return res.render('pricing', {
		title: 'Pricing'
	});
});

app.get('/', (req, res) => {
    return res.render('index', {
        title: 'Home'
    });
});

// app.use((err, req, res, next) => {
//     if (err.message.search(/Failed to lookup view "(.*)" in views directory/g) > -1 || err.status === 404)
// 		return res.status(404).render('404', {
// 	        title: '404 Not Page Found',
// 	        url: req.url
// 	    });
// 	console.error('Unexpected Error', err);
//     return res.status(500).send('An unexpected error occured.');
// });

app.listen(PORT, HOST, () => {
    console.log(`syfy-website listening on http://${HOST}:${PORT}`);
});
