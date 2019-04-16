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

<<<<<<< HEAD
// app.post('/login',(req,res)=>
// {
//     mongoose.model('users').find({name:req.body.nameSignin,password:req.body.passwordSign},
//       function(err,user)
//       {
//       res.send(user);})
// })
=======
app.post('/login',(req,res)=>
{
  console.log(req.body)
  // let a={name:req.body.nameSignin,password:req.body.password}
  // console.log(a)
  //   // mongoose.model('item').find({_id:req.body.id},function(err,result){ res.send(result)})

    mongoose.model('users').find({name:req.body.nameSignin,password:req.body.passwordSign},
      function(err,user)
      {
        console.log(user)
        res.send(user);
    })
})

>>>>>>> bdf46a6fc5be8ae4e409aed142e2d36bfc7507e7

//logout יציאה














// // catch 404 and forward to error handlerng 
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//  // res.render('error');
// });

// var port ='5000'|process.env.PORT
// app.listen(5000,()=>
// {
//   console.log(`Runing on port ${port} ...`)
// })

var httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

let port = process.env.PORT || 5000;
httpServer.listen(port, () => {
  console.log(`Runing on port ${port} ...`)
})
