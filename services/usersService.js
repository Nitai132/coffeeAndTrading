const mongoose = require('mongoose');
const userSchema = require('./../models/users.model');
const usersPositionSchema = require('../models/usersPositions.model');

const User = mongoose.model('User', userSchema); //שימוש במודל וסכמה של משתמש

const UsersPosition = mongoose.model('UsersPosition', usersPositionSchema);

const Signup = async ({firstName, lastName, phone, email, password}) => { //הרשמה למערכת 
    try {
    const u = new User({firstName, lastName, email, phone, password, isAdmin: 0, credits: 0}); //יצירת משתמש חדש
    const p = new UsersPosition({user: email, bonds: [], comodity: [], crypto: [], pairs: [], rest: [], stocks: []});
    await u.save();
    return await p.save(); //שמירת המשתמש בדאטאבייס
    } catch(err) { //במקרה של כשלון
        console.log(err);
        throw err;
    };
};

const getAllUsers = async () => { //הצגת כל המשתמשים
    try {
        return User.find({}); //מביא את כל המשתמשים במערכת
    } catch(err) { //במקרה של כשלון
        throw err;
    };
};

const getUserCredits = async (id) => { //בודק את כמות הקרדיט שיש למשתמש
    try {
        return User.find({_id: id}); //מציג את הפרטים של המשתמש
    } catch(err) { //במקרה של כשלון
        throw err;
    };
};

const changeCredits = async (email, amount) => { //שינוי כמות הקרדיטים של משתמש
    try {
        return User.updateOne({email: email}, { $set: { credits: amount }}) //משנה את הקרדיט של המשתמש לפי אימייל
    } catch(err) { //במקרה של כשלון
        throw err;
    };
};

const checkIfEmailExist = async (email) => {
    try {
       const user =  await User.find({email: email});
       if (user.length > 0) {
           return true
       }
       return false
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const deleteUser = async (id) => {
    try {
        return await User.deleteOne({_id: id})
    } catch(err) {
        console.log(err);
        throw err;
    };
};

module.exports = { Signup, getAllUsers, getUserCredits, changeCredits, checkIfEmailExist, deleteUser }; //יצוא הפונקציות