const mongoose = require('mongoose');
const liveRateBondSchema = require('./../models/liveRateBonds.model');
const usersPositionsSchema = require('./../models/usersPositions.model');
const liveRateCryptoSchema = require('../models/liveRateCrypto.model');

const userPositions = mongoose.model('userPositions', usersPositionsSchema, 'userspositions')
const LiveRateBond = mongoose.model('LiveRateBond', liveRateBondSchema, 'liveRateBonds');
const LiveRateCrypto = mongoose.model('LiveRateCrypto', liveRateCryptoSchema, 'liveRateCrypto');
const LiveRateComodity = mongoose.model('LiveRateComodity', liveRateCryptoSchema, 'liveRateComodity');
const LiveRateCurrencyPair = mongoose.model('LiveRateCurrencyPair', liveRateCryptoSchema, 'liveRateCurrencyPairs1');
const LiveRateRest = mongoose.model('LiveRateRest', liveRateCryptoSchema, 'liveRateRest');
const LiveRateStock = mongoose.model('LiveRateStock', liveRateCryptoSchema, 'liveRateStocks');


const getBond = async (id) => {
    try {
        const bond = await LiveRateBond.find({_id: id});
        return bond;
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const getCrypto = async (id) => {
    try {
        const crypto = await LiveRateCrypto.find({_id: id});
        return crypto;
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const getComodity = async (id) => {
    try {
        const comodity = await LiveRateComodity.find({_id: id});
        return comodity;
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const getCurrencyPair = async (id) => {
    try {
        const currencyPair = await LiveRateCurrencyPair.find({_id: id});
        return currencyPair;
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const getRest = async (id) => {
    try {
        const rest = await LiveRateRest.find({_id: id});
        return rest;
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const getStock = async (id) => {
    try {
        const stock = await LiveRateStock.find({_id: id});
        return stock;
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const getNewCrypto = async (amount) => {
    try {
        const getNewCrypto = await LiveRateCrypto.find()
        .sort({insertTime: -1})
        .limit(5)
        const shuffledArray = getNewCrypto.sort(() => 0.5 - Math.random());
        let selected = shuffledArray.slice(0, amount);
        return selected;
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const getAllCrypto = async() => {
    try {
        const getCrypto = await LiveRateCrypto.find()
        return getCrypto
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const getNewBonds = async (amount) => {
    try {
        const getNewBonds = await LiveRateBond.find()
        .sort({insertTime: -1})
        .limit(5)
        const shuffledArray = getNewBonds.sort(() => 0.5 - Math.random());
        let selected = shuffledArray.slice(0, amount);
        return selected;
    } catch(err) {
        console.log(err);
        throw err;
    };
}

const getAllBonds = async() => {
    try {
        const getBonds = await LiveRateBond.find()
        return getBonds
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const getNewRest = async (amount) => {
    try {
        const getNewRest = await LiveRateRest.find()
        .sort({insertTime: -1})
        .limit(5)
        const shuffledArray = getNewRest.sort(() => 0.5 - Math.random());
        let selected = shuffledArray.slice(0, amount);
        return selected;
    } catch(err) {
        console.log(err);
        throw err;
    };
}

const getAllRest = async() => {
    try {
        const getRest = await LiveRateRest.find()
        return getRest
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const getNewComodity = async (amount) => {
    try {
        const getNewComodity = await LiveRateComodity.find()
        .sort({insertTime: -1})
        .limit(5)
        const shuffledArray = getNewComodity.sort(() => 0.5 - Math.random());
        let selected = shuffledArray.slice(0, amount);
        return selected;
    } catch(err) {
        console.log(err);
        throw err;
    };
}

const getAllComodity = async() => {
    try {
        const getComodity = await LiveRateComodity.find()
        return getComodity
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const getNewPairs = async (amount) => {
    try {
        const getNewPairs = await LiveRateCurrencyPair.find()
        .sort({insertTime: -1})
        .limit(5)
        const shuffledArray = getNewPairs.sort(() => 0.5 - Math.random());
        let selected = shuffledArray.slice(0, amount);
        return selected;
    } catch(err) {
        console.log(err);
        throw err;
    };
}

const getAllPairs = async() => {
    try {
        const getPairs = await LiveRateCurrencyPair.find()
        return getPairs
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const getNewStocks = async (amount, rate) => {
    try {
        if (rate === 5) {
            const getNewStocks = await LiveRateStock.find({ startPrice : { $gt :  5, $lt : 100}})
            .sort({insertTime: -1})
            .limit(5)
            const shuffledArray = getNewStocks.sort(() => 0.5 - Math.random());
            let selected = shuffledArray.slice(0, amount);
            return selected;
        }
        if (rate === 100) {
            const getNewStocks = await LiveRateStock.find({ startPrice : { $gt :  100, $lt : 200}})
            .sort({insertTime: -1})
            .limit(5)
            const shuffledArray = getNewStocks.sort(() => 0.5 - Math.random());
            let selected = shuffledArray.slice(0, amount);
            return selected;
        }
        if (rate === 200) {
            const getNewStocks = await LiveRateStock.find({ startPrice : { $gt :  200}})
            .sort({insertTime: -1})
            .limit(5)
            const shuffledArray = getNewStocks.sort(() => 0.5 - Math.random());
            let selected = shuffledArray.slice(0, amount);
            return selected;
        }
    } catch(err) {
        console.log(err);
        throw err;
    };
}

const getAllStocks = async() => {
    try {
        const getStocks = await LiveRateStock.find()
        return getStocks
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const getPositions = async (email) => {
    try {
        const positions = await userPositions.find({user: email});
        return positions;
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const addNewPosition = async (type, email, id) => {
    try {
        const newPosition = await userPositions.updateOne({user: email}, { $push: { [type]: id } });
        return newPosition;
    } catch(err) {
        console.log(err);
        throw err;
    }
}


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
    getAllPairs
}