const express = require('express');
const router = express.Router();
const fs = require('fs')

// לשליחת פידיאף של הפוזיציות והכנה להורדה api
router.post('/downloadPage', async (req, res) => { 
    try {
        const { positions, email } = req.body;
        var pdf = require('../services/pdfService').create(positions); // יצירת הפידיאף
        pdf.end();
        pdf.pipe(fs.createWriteStream(`./public/usersPDF/${email}.pdf`)); // הכנסת הפידיאף לשרת
        return res.sendStatus(200); // הצלחה
    } catch (err) {
        console.log(err);
        return res.sendStatus(400); //כשלון
    };
});


module.exports = router;