const mongoose = require('mongoose');
const emailSchema = require('./../models/emails.model');

const Email = mongoose.model('Email', emailSchema); //שימוש במודל וסכמה

const sendEmail = async ({fullName, email, message}) => { //שליחת הודעה למערכת
    try {
    const E = new Email({fullName, email, message}); //יצירת אימייל חדש
    return await E.save(); //שמירת האימייל בדאטא בייס
    } catch(err) { //במקרה של כשלון
        console.log(err);
        throw err;
    };
};

const getAllEmail = async () => { //שליפת כל האימיילים
    try {
        return Email.find({}) //מציאת כל האימיילם בדאטא בייס 
    } catch(err) { //במקרה של כשלון
        throw err;
    }
}

const deleteEmail = async (id) => { //מחיקת אימייל
    try {
        return Email.deleteOne({_id: id}); //מוחק את האימייל
    } catch(err) { //במקרה של כשלון
        throw err;
    };
};

module.exports = { sendEmail, getAllEmail, deleteEmail};
