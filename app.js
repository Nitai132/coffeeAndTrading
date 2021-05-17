const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {localStrategyHandler, serializeUser, deserializeUser, isValid} = require('./passport');
const fileUpload = require('express-fileupload');
const UsersController = require('./controllers/usersController.js');
const EmailsController = require('./controllers/emailsController');
const positionsController = require('./controllers/positionsController');
const pdfController = require('./controllers/pdfController')
const path = require('path');

app.use(express.json()); //שימוש בג'ייסון
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); //שימוש בקוקיז
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload()); //אפשרות להעלות קבצים

app.use(session({ //שימוש בקוקיז פספורט סשן
    secret: 'Jovani123!$@#$', //קוד סודי
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({   
        uri: 'mongodb://adminnew:x8engX86cy8B@80.179.152.210:27018/TradingData', //סטרינג התחברות לדאטאבייס
        collection: 'mySessions' //קולקשן סשנים
    }),
    cookie: { //הגדרות של קוקיז
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60000
    },
}));

passport.use('local', new LocalStrategy(localStrategyHandler, { //שימוש בפספורט לוקאל
    usernameField: 'email',
    passwordField: 'password'
  }));
passport.serializeUser(serializeUser); //סיריאלייז למשתמש
passport.deserializeUser(deserializeUser); //דיסיריאלייז למשתמש

app.use(passport.initialize()); //שימוש בפספורט באפליקצייה
app.use(passport.session()); //שימוש בסשן באלפיקצייה


app.use('/auth', UsersController); // API של משתמשים
app.use('/emails', EmailsController); //API של הודעות
app.use('/positions', positionsController);
app.use('/pdf', pdfController);

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public", "index.html"));
  });

// app.use('*', isValid);

  
const init = async () => { //פונקצייה חכמה שמוודאת התחברות לדאטא בייס לפני הפעלת השרת
    try {
        await mongoose.connect('mongodb://adminnew:x8engX86cy8B@80.179.152.210:27018/TradingData', { //התחברות לדאטא בייס
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        app.listen(process.env.PORT || 4422, (err) => { //הפעלת השרת
            console.log('server is up');
        });
    } catch (err) { //במידה והתחברות נכשלה
        console.log(err);
    };
};

init(); //קריאה לפונקציה שמתחברת לדאטא בייס בעת הפעלת השרת
