var app = require('express')();
var compiler = require('webpack')(require('./webpack.config'));
const port = 3000;

app.use(require('webpack-dev-middleware')(compiler, {}));

app.get('*', (req, res) => {
	res.sendFile(__dirname + '/src/index.html');
});

app.listen(port, (err) => {
	if (err) return console.error(err);

	console.log('listening at http://localhost:' + port);
});
