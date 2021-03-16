// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Response output
let output = {
	unix: 0,
	utc: ""
}

// timestamp endpoints:

app.get("/api/timestamp/", function (req, res) {
	output.utc = new Date().toUTCString();
	output.unix = new Date(output.utc).getTime();
	res.json(output);
});

app.get("/api/timestamp/:time", function (req, res) {
	let time = req.params.time
	if(time.length <= 10) {
		output.utc = new Date(time).toUTCString();
		output.unix = new Date(output.utc).getTime();
	} else if(time.length <= 13) {
		output.unix = Number(time);
		output.utc = new Date(output.unix).toUTCString();
	} else {
		res.json({ error : "Invalid Date" });
	}
	res.json(output);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
