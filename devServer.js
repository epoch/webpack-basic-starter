var app = require('express')();
var path = require('path');
var config = require('./webpack.config');
var compiler = require('webpack')(config);
const port = 3000;

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath,
	stats: 'minimal',
	colors: true
}));

app.get('*', (req, res) => {
  var filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, function(err, result){
    if (err) {
      return next(err);
    }
    res.set('content-type','text/html');
    res.send(result);
    res.end();
  });
});

app.listen(port, (err) => {
	if (err) return console.error(err);

	console.log('listening at http://localhost:' + port);
});
