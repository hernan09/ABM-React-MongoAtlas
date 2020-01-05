const express = require('express')
const bodyParser = require('body-parser')
const REST_PORT = (process.env.PORT || 5100)

const cors = require('express-cross');
// const OneSignal = require('onesignal-node');
const app = express()

app.use(cors(true));
app.options('*', cors());
app.use( bodyParser.json() ) // support JSON-encoded bodies
app.use( bodyParser.urlencoded({ extended: true }) ) // support URL-encoded bodies
app.use( bodyParser.text({type: 'application/json'}) )

// app.use(express.static(__dirname + '/public'));
app.use('/', express.static('build')) // serve static files



app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 res.header('Access-Control-Expose-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
 res.header('Access-Control-Allow-Credentials', true);
 res.header("Access-Control-Max-Age", "0");
 next();
});


app.listen(REST_PORT, () => {
 console.log('App ready on port ' + REST_PORT)
})