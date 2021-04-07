require('dotenv').config();

const cors = require('cors')

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const serveIndex = require('serve-index')

const morgan = require('morgan');
var rfs = require('rotating-file-stream')

// create express app
const app = express();

// Show routes called in console during development
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'public/logs')
})

app.use(morgan('dev'));
app.use(morgan('combined', { stream: accessLogStream })) 


app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use('/ftp', express.static('public'), serveIndex('public', { 'icons': true }));
const environment = (process.env.NODE_ENV && process.env.NODE_ENV.trim()) || 'development';
require('custom-env').env(environment);

app.use("/api", require("./routes/index"));
app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')))

console.log(process.env.TWITTER_CONSUMER_KEY);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const swaggerDoc = require('./swaggerDoc');
swaggerDoc(app);

console.log(path.join(__dirname, '..', 'client', 'dist'));
// serve static files
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
//  handle all requests
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

const serverPort = process.env.PORT || 5000;
// listen for requests
app.listen(serverPort, () => {
    console.log("Server is listening on port 5000");
});

app.use(cors({
    exposedHeaders: ['Content-Disposition']
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

  


