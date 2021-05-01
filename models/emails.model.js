const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({ //סכמה אימיילים
    fullName: String, //שם מלא
    email: String, //אימייל
    message: String, //הודעה

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = emailSchema;