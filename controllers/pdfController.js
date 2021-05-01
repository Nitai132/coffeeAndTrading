const express = require('express');
const router = express.Router();
const fs = require('fs')

router.post('/downloadPage', async (req, res) => { 
    try {
        const { positions, email } = req.body;
        var pdf = require('../services/pdfService').create(positions);
        pdf.end();
        pdf.pipe(fs.createWriteStream(`./public/usersPDF/${email}.pdf`));
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400); //כשלון
    };
});


module.exports = router;