const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { localStrategyHandler, serializeUser, deserializeUser, isValid } = require('./passport');
const fileUpload = require('express-fileupload');
const path = require('path');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 4422;
/**
 * controllers
 */
const UsersController = require('./controllers/usersController.js');
const EmailsController = require('./controllers/emailsController');
const positionsController = require('./controllers/positionsController');
const pdfController = require('./controllers/pdfController');

/**
 * services
 */
const socketService = require('./services/socket/socketServices');

/**
 * connect to db
 */
const { mongoDBStoreConfig, cookiesConfig, mongooseConnection, passportConfig } = require('./config')
const dbString = 'mongodb://adminnew:x8engX86cy8B@80.179.152.210:27018/TradingData?authSource=admin';

app.use(cors());
app.use(express.json()); //שימוש בג'ייסון
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //שימוש בקוקיז
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload()); //אפשרות להעלות קבצים

app.use(session({ //שימוש בקוקיז פספורט סשן
    secret: 'Jovani123!$@#$',
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore(mongoDBStoreConfig),
    cookie: cookiesConfig,
}));

passport.use('local', new LocalStrategy(localStrategyHandler, passportConfig));
passport.serializeUser(serializeUser); //סיריאלייז למשתמש
passport.deserializeUser(deserializeUser); //דיסיריאלייז למשתמש

app.use(passport.initialize()); //שימוש בפספורט באפליקצייה
app.use(passport.session()); //שימוש בסשן באלפיקצייה


app.use('/auth', UsersController); // API של משתמשים
app.use('/emails', EmailsController); //API של הודעות
app.use('/positions', positionsController);
app.use('/pdf', pdfController);

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public", "index.html"));
});

// app.use('*', isValid);


const init = async () => { //פונקצייה חכמה שמוודאת התחברות לדאטא בייס לפני הפעלת השרת
    try {
        await mongoose.connect(dbString, mongooseConnection);
        app.listen(PORT, (err) => { //הפעלת השרת
            console.log(`server is up on port ${PORT}`);
        });
    } catch (err) { //במידה והתחברות נכשלה
        console.log(err);
    };
};
init();

// socket.io הגדרות
const httpServer = http.createServer(app);

httpServer.listen(3007, () => {
    console.log('listening on: 3007');


});

global.io = new Server(httpServer, { cors: { origin: "*" } });
socketService.connectToSocket(global.io);
