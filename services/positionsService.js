const mongoose = require('mongoose');
const liveRateBondSchema = require('./../models/liveRateBonds.model');
const usersPositionsSchema = require('./../models/usersPositions.model');
const liveRateCryptoSchema = require('../models/liveRateCrypto.model');
const userSchema = require('./../models/users.model');

const userPositions = mongoose.model('userPositions', usersPositionsSchema, 'userspositions')
const LiveRateBond = mongoose.model('LiveRateBond', liveRateBondSchema, 'liveRateBonds');
const LiveRateCrypto = mongoose.model('LiveRateCrypto', liveRateCryptoSchema, 'liveRateCrypto');
const LiveRateComodity = mongoose.model('LiveRateComodity', liveRateCryptoSchema, 'liveRateComodity');
const LiveRateCurrencyPair = mongoose.model('LiveRateCurrencyPair', liveRateCryptoSchema, 'liveRateCurrencyPairs1');
const LiveRateRest = mongoose.model('LiveRateRest', liveRateCryptoSchema, 'liveRateIndexes');
const LiveRateStock = mongoose.model('LiveRateStock', liveRateCryptoSchema, 'iexStocks');
const User = mongoose.model('User', userSchema); //שימוש במודל וסכמה של משתמש


// סרביס שמוצא בדאטאבייס פוזיציה מסוג בונד לפי איידי ומחזיר אותה
const getBond = async (id) => {
    try {
        const bond = await LiveRateBond.find({ _id: id });
        return bond;
    } catch (err) {
        console.log(err);
        throw err;
    };
};

// סרביס שמוצא בדאטאבייס פוזיציה מסוג קריפטו לפי איידי ומחזיר אותה
const getCrypto = async (id) => {
    try {
        const crypto = await LiveRateCrypto.find({ _id: id });
        return crypto;
    } catch (err) {
        console.log(err);
        throw err;
    };
};

// סרביס שמוצא בדאטאבייס פוזיציה מסוג קומודיטי לפי איידי ומחזיר אותה
const getComodity = async (id) => {
    try {
        const comodity = await LiveRateComodity.find({ _id: id });
        return comodity;
    } catch (err) {
        console.log(err);
        throw err;
    };
};

// סרביס שמוצא בדאטאבייס פוזיציה מסוג קורנסי פיירס לפי איידי ומחזיר אותה
const getCurrencyPair = async (id) => {
    try {
        const currencyPair = await LiveRateCurrencyPair.find({ _id: id });
        return currencyPair;
    } catch (err) {
        console.log(err);
        throw err;
    };
};

// סרביס שמוצא בדאטאבייס פוזיציה מסוג רסט לפי איידי ומחזיר אותה
const getRest = async (id) => {
    try {
        const rest = await LiveRateRest.find({ _id: id });
        return rest;
    } catch (err) {
        console.log(err);
        throw err;
    };
};

// סרביס שמוצא בדאטאבייס פוזיציה מסוג סטוק לפי איידי ומחזיר אותה
const getStock = async (id) => {
    try {
        const stock = await LiveRateStock.find({ _id: id });
        return stock;
    } catch (err) {
        console.log(err);
        throw err;
    };
};

// סרביס שמוצא בדאטאבייס את 5 הפוזיציות האחרונות שנכנסו מסוג קריפטו ומחזיר את כמות הפוזיציות שהשמתמש רצה לקנות באופן רנדומלי
const getNewCrypto = async (amount) => {
    try {
        const date = new Date()
        const time = date.getTime() - (1740000);
        const getNewCrypto = await LiveRateCrypto.find( {insertTime: { $gt: time} }  ) // מוצא את הפוזיציות בשרת
            .sort({ insertTime: -1 }) // לפי הפוזיציות האחרונות שנבחרו
            .limit(5) // עד 5 פוזיציות
        const shuffledArray = getNewCrypto.sort(() => 0.5 - Math.random()); // רנדומציה למערך
        let selected = shuffledArray.slice(0, amount); // סלייס לפי כמות הפוזיציות שהמשתמש רצה
        return selected;
    } catch (err) {
        console.log(err); // במקרה של כשלון
        throw err;
    };
};

// סרביס שמחזיר את כל הפוזיציות מסוג קריפטו בשביל האדמין
const getAllCrypto = async () => {
    try {
        const getCrypto = await LiveRateCrypto.find()
        return getCrypto
    } catch (err) {
        console.log(err);
        throw err;
    };
};

// סרביס שמוצא בדאטאבייס את 5 הפוזיציות האחרונות שנכנסו מסוג בונד ומחזיר את כמות הפוזיציות שהשמתמש רצה לקנות באופן רנדומלי
const getNewBonds = async (amount) => {
    try {
        const date = new Date()
        const time = date.getTime() - (1740000);
        const getNewBonds = await LiveRateBond.find( {insertTime: { $gt: time} } ) // מוצא את הפוזיציות בשרת
            .sort({ insertTime: -1 }) // לפי הפוזיציות האחרונות שנבחרו
            .limit(5) // עד 5 פוזיציות
        const shuffledArray = getNewBonds.sort(() => 0.5 - Math.random()); // רנדומציה למערך
        let selected = shuffledArray.slice(0, amount); // סלייס לפי כמות הפוזיציות שהמשתמש רצה
        return selected;
    } catch (err) {
        console.log(err);  // במקרה של כשלון
        throw err;
    };
}
// סרביס שמחזיר את כל הפוזיציות מסוג בונדס בשביל האדמין
const getAllBonds = async () => {
    try {
        const getBonds = await LiveRateBond.find()
        return getBonds
    } catch (err) {
        console.log(err);
        throw err;
    };
};


// סרביס שמוצא בדאטאבייס את 5 הפוזיציות האחרונות שנכנסו מסוג רסט ומחזיר את כמות הפוזיציות שהשמתמש רצה לקנות באופן רנדומלי
const getNewRest = async (amount) => {
    try {
        const date = new Date()
        const time = date.getTime() - (1740000);
        const getNewRest = await LiveRateRest.find( {insertTime: { $gt: time} } ) // מוצא את הפוזיציות בשרת
            .sort({ insertTime: -1 }) // לפי הפוזיציות האחרונות שנבחרו
            .limit(5)  // עד 5 פוזיציות
        const shuffledArray = getNewRest.sort(() => 0.5 - Math.random()); // רנדומציה למערך
        let selected = shuffledArray.slice(0, amount); // סלייס לפי כמות הפוזיציות שהמשתמש רצה
        return selected;
    } catch (err) {
        console.log(err);  // במקרה של כשלון
        throw err;
    };
}

// סרביס שמחזיר את כל הפוזיציות מסוג רסט בשביל האדמין
const getAllRest = async () => {
    try {
        const getRest = await LiveRateRest.find()
        return getRest
    } catch (err) {
        console.log(err);
        throw err;
    };
};

// סרביס שמוצא בדאטאבייס את 5 הפוזיציות האחרונות שנכנסו מסוג רסט ומחזיר את כמות הפוזיציות שהשמתמש רצה לקנות באופן רנדומלי
const getNewComodity = async (amount) => {
    try {
        const date = new Date()
        const time = date.getTime() - (1740000);
        const getNewComodity = await LiveRateComodity.find( {insertTime: { $gt: time} } ) // מוצא את הפוזיציות בשרת
            .sort({ insertTime: -1 })  // לפי הפוזיציות האחרונות שנבחרו
            .limit(5) // עד 5 פוזיציות
        const shuffledArray = getNewComodity.sort(() => 0.5 - Math.random());  // רנדומציה למערך
        let selected = shuffledArray.slice(0, amount); // סלייס לפי כמות הפוזיציות שהמשתמש רצה
        console.log(selected);
        return selected;
    } catch (err) {
        console.log(err); // במקרה של כשלון
        throw err;
    };
}

// סרביס שמחזיר את כל הפוזיציות מסוג קומודיטי בשביל האדמין
const getAllComodity = async () => {
    try {
        const getComodity = await LiveRateComodity.find()
        return getComodity
    } catch (err) {
        console.log(err);
        throw err;
    };
};

// סרביס שמוצא בדאטאבייס את 5 הפוזיציות האחרונות שנכנסו מסוג קורנסי ומחזיר את כמות הפוזיציות שהשמתמש רצה לקנות באופן רנדומלי
const getNewPairs = async (amount) => {
    try {
        const date = new Date()
        const time = date.getTime() - (1740000);
        const getNewPairs = await LiveRateCurrencyPair.find( {insertTime: { $gt: time} } ) // מוצא את הפוזיציות בשרת רק במידה ונוצרה ברבע שעה האחרונה
            .sort({ insertTime: -1 }) // לפי הפוזיציות האחרונות שנבחרו
            .limit(5) // עד 5 פוזיציות
        const shuffledArray = getNewPairs.sort(() => 0.5 - Math.random()); // רנדומציה למערך
        let selected = shuffledArray.slice(0, amount);  // סלייס לפי כמות הפוזיציות שהמשתמש רצה
        return selected;
    } catch (err) {
        console.log(err);  // במקרה של כשלון
        throw err;
    };
}

// סרביס שמחזיר את כל הפוזיציות מסוג קורנסי פיירס בשביל האדמין
const getAllPairs = async () => {
    try {
        const getPairs = await LiveRateCurrencyPair.find()
        return getPairs
    } catch (err) {
        console.log(err);
        throw err;
    };
};


// סרביס שמוצא בדאטאבייס את 5 הפוזיציות האחרונות שנכנסו מסוג סטוקס ומחזיר את כמות הפוזיציות שהשמתמש רצה לקנות באופן רנדומלי
const getNewStocks = async (amount, rate) => {
    try {
        const date = new Date()
        const time = date.getTime() - (1740000);
        if (rate === '5') { // חלוקה לפי ערך המנייה - בין 5-99
            const getNewStocks = await LiveRateStock.find({ startPrice: { $gt: 4, $lt: 100 } }, {insertTime: { $gt: time} }) // מוצא את הפוזיציות בשרת
                .sort({ insertTime: -1 }) // לפי הפוזיציות האחרונות שנבחרו
                .limit(5) // עד 5 פוזיציות
            const shuffledArray = getNewStocks.sort(() => 0.5 - Math.random()); // רנדומציה למערך
            let selected = shuffledArray.slice(0, amount);  // סלייס לפי כמות הפוזיציות שהמשתמש רצה
            return selected;
        }
        if (rate === '100') { // חלוקה לפי ערך המנייה - בין 100-199
            const getNewStocks = await LiveRateStock.find({ startPrice: { $gt: 99, $lt: 200 } }, {insertTime: { $gt: time} }) // מוצא את הפוזיציות בשרת
                .sort({ insertTime: -1 }) // לפי הפוזיציות האחרונות שנבחרו
                .limit(5) // עד 5 פוזיציות
            const shuffledArray = getNewStocks.sort(() => 0.5 - Math.random()); // רנדומציה למערך
            let selected = shuffledArray.slice(0, amount); // סלייס לפי כמות הפוזיציות שהמשתמש רצה
            return selected;
        }
        if (rate === '200') { // חלוקה לפי ערך המנייה - 200 פלוס
            const getNewStocks = await LiveRateStock.find({ startPrice: { $gt: 199 } }, {insertTime: { $gt: time } })  // מוצא את הפוזיציות בשרת
                .sort({ insertTime: -1 }) // לפי הפוזיציות האחרונות שנבחרו
                .limit(5) // עד 5 פוזיציות
            const shuffledArray = getNewStocks.sort(() => 0.5 - Math.random());  // רנדומציה למערך
            let selected = shuffledArray.slice(0, amount); // סלייס לפי כמות הפוזיציות שהמשתמש רצה
            return selected;
        }
    } catch (err) {
        console.log(err); // במקרה של כשלון
        throw err;
    };
}

// סרביס שמחזיר את כל הפוזיציות מסוג סטוקס בשביל האדמין
const getAllStocks = async () => {
    try {
        const getStocks = await LiveRateStock.find()
        return getStocks
    } catch (err) {
        console.log(err);
        throw err;
    };
};

//סרביס שמחזיר את כל הפוזיציות שיש למשתמש מסויים לפי אימייל
const getPositions = async (email) => {
    try {
        const positions = await userPositions.find({ user: email });
        return positions;
    } catch (err) {
        console.log(err);
        throw err;
    };
};

//סרביס שמוסיף ושומר למשתמש את הפוזיציה החדשה בתוך הדאטאבייס
const addNewPosition = async (type, email, id) => {
    try {
        const newPosition = await userPositions.updateOne({ user: email }, { $push: { [type]: id } });
        return newPosition;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

//סרביס שמקבל פוזיציות שיצאו פולס ומוצא את כל המשתמשים עם אותה פוזיציה 
const checkUsersWithFalsePosition = async (id) => {
    try {
        const usersWithFalsePositions = await userPositions.find({
            $or: [
                { bonds: id },
                { crypto: id },
                { comodity: id },
                { pairs: id },
                { stocks: id },
            ]
        });
        const usersArray = usersWithFalsePositions.map(({ user }) => user)
        return usersArray;
    } catch (err) {
        console.log(err);
        throw err;
    };
};

//סרביס שמקבל מערך של משתמשים שצריכים לקבל זיכוי ומחזיר לכל אחד מהם קרדיט אחת
const refundUsers = async (usersArray) => {
    try {
        const usersToRefund = await User.find({ email: { $in: usersArray } });
        for (let i = 0; i < usersToRefund.length; i++) {
            await User.updateOne({ email: usersToRefund[i].email }, { $inc: { credits: 1 } })
        }
        return usersToRefund
    } catch (err) {
        console.log(err);
        throw err;
    };
};


module.exports = {
    getBond,
    getPositions,
    getCrypto,
    getComodity,
    getCurrencyPair,
    getRest,
    getStock,
    getNewCrypto,
    addNewPosition,
    getNewBonds,
    getNewStocks,
    getNewRest,
    getNewComodity,
    getNewPairs,
    getAllBonds,
    getAllStocks,
    getAllComodity,
    getAllRest,
    getAllCrypto,
    getAllPairs,
    checkUsersWithFalsePosition,
    refundUsers
}