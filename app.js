var express = require('express')
	, app = express()
	, morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('*', function(req, res) {
	res.json(404);
})

app.listen(3000, function() {
	console.log('Running')
})