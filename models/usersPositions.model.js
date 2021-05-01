const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersPositionSchema = new Schema({ //סכמה משתמש
    user: String, 
    bonds: Array, 
    comodity: Array, 
    crypto: Array, 
    pairs: Array, 
    rest: Array, 
    stocks: Array
}, { timestamps: {updatedAt: 'updated_at' } });

module.exports = usersPositionSchema;