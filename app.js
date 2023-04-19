

//var corsMiddleware = require('../cors.js')
//app.use(corsMiddleware); 
//var cors = require('cors')

const express = require('express');



const app = express();


require('dotenv').config({ path: '.env'});


const path = require('path');
const routes = require('./routes/router')

//const sessions = require('./sessions.js')      /////////////
const sessions = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(sessions);

const store = new MongoDBStore({
  //  uri: process.env.DATABASE_URL_LOCAL,
        uri: process.env.DATABASE_URL,
         collection: process.env.SESSION_COLLECTION_NAME
      })
    console.log("STORE",store);

app.use(sessions({
    secret:  process.env.SESSION_SECRET,
    resave: JSON.parse(process.env.RESAVE_SESSION).resave,
    saveUninitialized: JSON.parse(process.env.SAVE_UNINITIALIZD).saveUninitialized,
    cookie: { maxAge: parseInt(process.env.COOKIE_AGE)},      
    store: store  
}) );  



console.log("SESSIONS",sessions)


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));  //czytanie danych z formularzy


const cookieParser =  require('cookie-parser');
app.use(cookieParser());

const flash = require('connect-flash');
const ConnectMongoDBSession = require('connect-mongodb-session');
app.use(flash());

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname,'views'));
app.set(express.static(path.join(__dirname,'publics')));



app.use(express.json());



//app.use(cors())




app.use('/',routes);
app.use(express.static('publics'))

app.use('/NTP',routes);
app.use('/LOAD',routes);
app.use('/dBase',routes);
app.use('/register',routes);
app.use('/reset',routes);
app.use('/resetRequest',routes);

//console.log("app", app);

module.exports = app;








