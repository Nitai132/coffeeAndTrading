const express = require('express');
const router = express.Router();
const { sendEmail, getAllEmail, deleteEmail} = require('../services/emailsService');
const { adminValidation } = require('../validations/adminValidation');

router.post('/send', async (req, res) => { //שליחת הודעה למערכת API
    try {
        await sendEmail(req.body); //פונקצייה שמכניסה הודעה לדאטאבייס
        return res.sendStatus(200); //הצלחה
    } catch (err) {
        console.log(err);
        return res.sendStatus(400); //כשלון
    };
});

router.get('/getAll', adminValidation, async (req, res) => { //מביא את כל האימיילים במערכת API
    try {
        const emails = await getAllEmail(); //פונקצייה שמביאה את כל האימיילים
        return res.json(emails); //מחזיר את האימיילם אם יש הצלחה
    } catch(err) {
        console.log(err);
        return res.sendStatus(400); //כשלון
    };
});

router.delete('/delete/:id', adminValidation, async (req, res) => { //מחיקת הודעה API
    try {
        const {id} = req.params; //בודק איידי לפי URL
        await deleteEmail(id); //פונקצייה שמוחקת את האימייל
        return res.sendStatus(200); //הצלחה
    } catch(err) {
        console.log(err);
        return res.sendStatus(400); //כשלון
    };
});

module.exports = router;
