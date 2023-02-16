const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersPositionsIBSchema = new Schema({
    _id: String,
    user: String,
    mongoID: String,
    IB_ID: String,
    exchange: String,
    operation: String,
    positionType: String,
    symbol: String,
    technologies: String,
    margin: Number,
    startDate: String,
    endDate: String,
    startPrice: Number,
    endPrice: Number,
    succeeded: Boolean,
    pipsed: Number,
    quantity: Number,
    currentAccountBalance: Number,
    stopLoss: Number,
    takeProfit: Array,
    stoplossUsed: Boolean,
    totalBrokerFee: Number,
    active: Boolean
}, { collection: "usersPositionsIB" });

module.exports = usersPositionsIBSchema;