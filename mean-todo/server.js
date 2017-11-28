const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const API = require('./server/routes/api');

const app = express();

// connect DB
var databaseUrl = 'mongodb://julee_k:julee_k@ds121906.mlab.com:21906/board';

// mongoose.connect(databaseUrl, {
//     useMongoClient: true
// });

mongoose.connect(databaseUrl);
var db = mongoose.connection;

db.once('open', function(){
    console.log('DB connected');
});
db.on('error', function(err){
    console.log('DB ERROR : ' + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

// setting router
app.use('/api', API);

// wroung path => index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// port
const port = process.env.PORT || 3000;
app.set('port', port);

// create server
const server = http.createServer(app);

// excute server
server.listen(port, () => {
    console.log(`API running on localhost:${port}`);
});
