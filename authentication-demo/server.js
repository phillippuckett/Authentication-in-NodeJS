var express     = require('express'),
    bodyParser  = require('body-parser'),
    cors        = require('cors'),
    mongoose    = require('mongoose'),
    session     = require('express-session'),
    passport    = require('passport'),
    ejs         = require('ejs'),
    path        = require('path'),
    keys        = require('./config/keys.js');

// App definition
var app = express();
// app.set('view engine', 'ejs');

require('./config/passport')(passport);

// Middleware
app.use(session({
    secret: 'super mega secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(__dirname + '/'));


// require('./controllers/Routes.js')(app, passport);
// require('./controllers/Api.js')(app);
var UserController = require('./controllers/UserController.js');

// -> Auth
app.post('/api/auth', passport.authenticate('local-signup', {
   successRedirect : '/',
   failureRedirect : '/signup'
}));

app.get('/api/get-user', UserController.getUser);


// Connections
if (keys.env == 'DEVELOPMENT') { var portNum = 3000; } else { var portNum = 80; }

var mongooseUri = 'mongodb://localhost/auth';
mongoose.connect(mongooseUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Mongoose uri:', mongooseUri);
});

app.listen(portNum, function () {
    console.log('Aliens are watching on port: ' + portNum, 'in ' + keys.env + ' mode.');
});
