var http = require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose =require('mongoose');
var bodyParser=require("body-parser")
var multer = require("multer");
var express_fileupload=require('express-fileupload')
var cloudinary = require('cloudinary');
var passport =require("passport")
var passport = require('passport');
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});
const passportSetup = require('./config/passport-setup');

let connectMongo = require('connect-mongo');
let session = require('express-session');


// const cookieSession = require('cookie-session');
const authRoutes = require('./routes/auth-routes');
const keys = require('./config/keys');

var user=require('./routes/user')
var order=require('./routes/order')
var item=require('./routes/item')

const graphql = require('chat-plugin').default;
const server = require('chat-plugin').server;

//Sechem of data (mongos)
mongoose.connect('mongodb://localhost/DB_shop',{useNewUrlParser: true})
  .then(console.log('DB is conectet ...'))
  .catch(err=>console.log(err))
require('./models/users');
require('./models/item');
require('./models/order');

// view engine setup
let secret = 'chat-plugin secret';
var app = express();


cloudinary.config({ 
  cloud_name: 'dvd8gmxgd', 
  api_key: '179979221292518', 
  api_secret: 'I0RHqeGogJVdiwjJTDE5fd3Z2h0' 
});



// app.use(bodyParser())
app.use(bodyParser.json());
app.use(express_fileupload());
app.use(cookieParser(secret))

let sessionConnect = mongoose.createConnection();

(async () => {
  try {
    await sessionConnect.openUri("mongodb://localhost/DB_shop", { useNewUrlParser: true });
  } catch (err) {
    console.error(`Error connecting to session backend DB: ${err}`);
    process.exit(0);
  }
})();

let MongoStore = connectMongo(session);


// set up session cookies
app.use(session({
  name: 'users.sid',
  secret: secret,
  resave: false,
  saveUninitialized: true,
  rolling: true,
  store: new MongoStore({ mongooseConnection: sessionConnect }),
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, sameSite: true } 
}));  

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'front/dist/front')))




//routing
app.use('/auth', authRoutes);
app.use('/user', user);
app.use('/item', item);
app.use('/order', order);



app.use('/chat', graphql(
  `http://localhost:5000/chat/graphql`,
  `ws://localhost:5000/graphql`,
  `mongodb://localhost/DB_shop`,
  `mongodb://localhost/DB_shop`
));




//singin רישום

app.post('/sign',(req,res)=>
{
  
  var users =mongoose.model('users')
  var user={
    type:'user',
    name:req.body.nameLog,
    family:req.body.famely,
    password:req.body.password1,    
    email:req.body.email,
    city :req.body.city,
    gender:req.body.gender,
    phone:req.body.phone,
    active:true
  }
  
  new users(user).save().then(data=> console.log(data))
})


app.get('/id', (req, res) => {
  res.send(req.user)
})


app.post('/login', passport.authenticate('local', { failureRedirect: '/fail' }),
  function(req, res) {
    req.session.userId = user.id;
    req.session.userName = user.username;
    req.session.admin = user.admin;
    
    res.send(req.user);
  });

var httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

let port = process.env.PORT || 5000;
httpServer.listen(port, () => {
  console.log(`Runing on port ${port} ...`)
})
