const express = require('express');
const router = express.Router();
const { adminValidation } = require('../validations/adminValidation');
const { 
    getBond, 
    getPositions, 
    getCrypto, 
    getComodity, 
    getCurrencyPair, 
    getRest,
    getStock,
    addNewPosition,
    getNewCrypto,
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
    checkUsersWithFalsePosition
} = require('../services/positionsService');

router.get('/getBond/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        const bond = await getBond(id); 
        return res.json(bond); 
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});

router.get('/getAllBonds', adminValidation, async (req, res) => { 
    try {
        const bonds = await getAllBonds(); 
        return res.json(bonds); 
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});

router.get('/getCrypto/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const crypto = await getCrypto(id);
        return res.json(crypto); 
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});

router.get('/getAllCrypto',adminValidation, async (req, res) => { 
    try {
        const crypto = await getAllCrypto(); 
        return res.json(crypto); 
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});

router.get('/getComodity/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const comodity = await getComodity(id);
        return res.json(comodity); 
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});

router.get('/getAllComodity', adminValidation, async (req, res) => { 
    try {
        const comodity = await getAllComodity(); 
        return res.json(comodity); 
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});

router.get('/getCurrencyPair/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const CurrencyPair = await getCurrencyPair(id);
        return res.json(CurrencyPair); 
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});

router.get('/getAllPairs', adminValidation, async (req, res) => { 
    try {
        const pairs = await getAllPairs(); 
        return res.json(pairs); 
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});

router.get('/getRest/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const rest = await getRest(id);
        return res.json(rest); 
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});

router.get('/getAllRest', adminValidation, async (req, res) => { 
    try {
        const rest = await getAllRest(); 
        return res.json(rest); 
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});

router.get('/getStock/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const stock = await getStock(id);
        return res.json(stock); 
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});

router.get('/getAllStocks', adminValidation, async (req, res) => { 
    try {
        const stocks = await getAllStocks(); 
        return res.json(stocks); 
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});

router.get('/getNewCrypto/:amount', async (req, res) => {
    try {
        const { amount } = req.params;
        const newCrypto = await getNewCrypto(amount);
        return res.json(newCrypto);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    };
});

router.get('/getNewBonds/:amount', async (req, res) => {
    try {
        const { amount } = req.params;
        const newBonds = await getNewBonds(amount);
        return res.json(newBonds);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    };
});

router.get('/getNewComodity/:amount', async (req, res) => {
    try {
        const { amount } = req.params;
        const newComodity = await getNewComodity(amount);
        return res.json(newComodity);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    };
});

router.get('/getNewpairs/:amount', async (req, res) => {
    try {
        const { amount } = req.params;
        const newpairs = await getNewPairs(amount);
        return res.json(newpairs);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    };
});

router.get('/getNewRest/:amount', async (req, res) => {
    try {
        const { amount } = req.params;
        const newRest = await getNewRest(amount);
        return res.json(newRest);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    };
});

router.get('/getNewStocks/:amount/:rate', async (req, res) => {
    try {
        const { amount, rate } = req.params;
        const newStocks = await getNewStocks(amount, rate);
        return res.json(newStocks);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    };
});

router.post('/addNewPosition', async (req, res) => {
    try {
        const {type, email, id } = req.body;
        await addNewPosition(type, email, id);
        return res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.get('/getUserPositions/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const positions = await getPositions(email);
        return res.json(positions);
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});

router.post('/falsePosition', async (req, res) => {
    try {
        const { id } = req.body;
        const usersWithFalsePositions = await checkUsersWithFalsePosition(id);
        return res.json(usersWithFalsePositions);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    };
});



module.exports = router;