const express = require('express');
const router = express.Router();
const { createReport } = require('../services/reportsService');



router.get('/createReport/:type/:amount/:userEmail', async (req, res) => {
    try {
        console.log(1)
        const {type, amount, userEmail } = req.params;
        const report = await createReport(type, amount, userEmail);
        return res.json(report);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    };

})



module.exports = router;
