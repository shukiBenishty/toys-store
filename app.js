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
let session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});


const graphql = require('chat-plugin').default;
const server = require('chat-plugin').server;


// view engine setup
let secret = 'shopToys'
var app = express();
app.use(bodyParser())
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'front/dist/front')))
app.use(express_fileupload());
app.use(cookieParser(secret));
app.use(passport.initialize());
app.use(session({resave:true, saveUninitialized:true, secret: secret}))


app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: true}));




//routing
var user=require('./routes/user')
var order=require('./routes/order')
var item=require('./routes/item')
app.use('/user', user);
app.use('/item', item);
app.use('/order', order);



app.use('/chat', graphql(
  `http://localhost:5000/chat/graphql`,
  `ws://localhost:5000/graphql`,
  `mongodb://localhost/chat-plugin`,
  `mongodb://localhost/chat-plugin`
));

//Sechem of data (mongos)
mongoose.connect('mongodb://localhost/DB_shop',{useNewUrlParser: true})
.then(console.log('DB is conectet ...')).catch(err=>console.log(err))
require('./models/users');
require('./models/item');
require('./models/order');


cloudinary.config({ 
  cloud_name: 'dvd8gmxgd', 
  api_key: '179979221292518', 
  api_secret: 'I0RHqeGogJVdiwjJTDE5fd3Z2h0' 
});


passport.use(new GoogleStrategy({
    consumerKey: '389636481868-e1cllh1fp7k6rst2rnvvuguj9n4tl5di.apps.googleusercontent.com',
    consumerSecret: 'pRgAsp3H8HStOROvBQzO3Cly',
    callbackURL: "http://localhost:5000/gmail"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));


app.get('/auth/google',passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }))


app.get('gmail', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.send('tr');
  });



app.get('/',(req,res)=>{

  

})



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





app.post('/login',(req,res)=>
{
  console.log(req.body)
  let a={name:req.body.nameSignin,password:req.body.password}
  console.log(a)
    // mongoose.model('item').find({_id:req.body.id},function(err,result){ res.send(result)})

    mongoose.model('users').find({name:req.body.nameSignin,password:req.body.password},
      function(err,user)
      {
        console.log(user)
        res.send(user);
    })
})
















// catch 404 and forward to error handlerng 
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
 // res.render('error');
});

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
