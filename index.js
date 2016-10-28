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
	return next();
	// // Handle 404 Errors
	// if (err.message.search(/Failed to lookup view "(.*)" in views directory/g) < 0) return next();
	//
	// res.status(404);
    // if (req.accepts('html')) {
    //     return res.render('404', {
	// 		title: '404 Not Page Found',
    //         url: req.url
    //     });
    // } else if (req.accepts('json')) {
    //     return res.sendJSON({
    //         error: 'Not found'
    //     });
    // } else {
    //     return res.type('txt').send('Not found');
    // }
});

app.listen(PORT, HOST, () => {
    console.log(`syfy-website listening on http://${HOST}:${PORT}`);
});
