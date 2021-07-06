const mongoose = require('mongoose');
const userSchema = require('./../models/users.model');

const User = mongoose.model('User', userSchema); //שימוש בסכמה ומודל

module.exports = {
    localStrategyHandler: async (email, password, done) => { //לוקאל סטרטג'י
        const user = await User.findOne({ email, password }); //מחפש את המשתמש בדאטא בייס
        if (!user) {
            return done(null, false); // במידה והמשתמש לא נמצא
        }
        return done(null, user); //במידה והמשתמש נמצא
    },
    serializeUser: (user, done) => { //סיריאליזצייה
        done(null, user);
    },
    deserializeUser: (user, done) => { //דיסיריאליזצייה
        done(null, user);
    },
    isValid: (req, res, next) => { //בדיקה שהמשתמש מחובר
        if (req.isAuthenticated()) { //אם המשתמש מחובר
            return next(); //המשך
        }
        return res.sendStatus(401); //שגיאה: אוטנטיקציה
    }
}