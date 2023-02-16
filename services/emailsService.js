const mongoose = require('mongoose');
const emailSchema = require('./../models/emails.model');

const Email = mongoose.model('Email', emailSchema); //שימוש במודל וסכמה

var nodemailer = require('nodemailer');


const sendEmail = async ({ fullName, email, message }) => { //שליחת הודעה למערכת
    try {
        const E = new Email({ fullName, email, message }); //יצירת אימייל חדש
        return await E.save(); //שמירת האימייל בדאטא בייס
    } catch (err) { //במקרה של כשלון
        console.log(err);
        throw err;
    };
};

const getAllEmail = async () => { //שליפת כל האימיילים
    try {
        return Email.find({}) //מציאת כל האימיילם בדאטא בייס 
    } catch (err) { //במקרה של כשלון
        throw err;
    }
}

const deleteEmail = async (id) => { //מחיקת אימייל
    try {
        return Email.deleteOne({ _id: id }); //מוחק את האימייל
    } catch (err) { //במקרה של כשלון
        throw err;
    };
};

const sendRegisterationMail = async (email, username, password) => {
    try {
        var transporter = nodemailer.createTransport({
            host: 'box2539.bluehost.com',
            port: 465,
            secure: true,
            auth: {
              user: 'donotreply@tradingandcoffeeapplication.com',
              pass: 'JOVANYFOREVEr34189696#@#'
            },
            tls : { rejectUnauthorized: false }
          });
          
          var mailOptions = {
            from: 'donotreply@tradingandcoffeeapplication.com',
            to: email,
            subject: 'Welcome to Coffee & Trading Application',
            html: `<h3>Welcome to Trading And coffee application</h3> 
            <br /> This is your login information: 
            <br /> Your username is: ${username} 
            <br /> Your password is: ${password}
            <br/ > In addiction, this is a link to a guide that will help you understand how to use Trading and coffee systems.
            <br /> Please read it and if you have any other questions please contact us via Whatsapp or Email.
            <br> https://docs.google.com/document/d/1E0KdjXvAs7C6EPGDRsCPhPlHvYcXITe42m8CIRJmlas/edit?usp=sharing
            `
          };          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const sendPositionMail = async (email, position) => {
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        var transporter = nodemailer.createTransport({
          host: 'box2539.bluehost.com',
          port: 465,
          secure: true,
          auth: {
            user: 'donotreply@tradingandcoffeeapplication.com',
            pass: 'JOVANYFOREVEr34189696#@#'
          },
          tls : { rejectUnauthorized: false }
          });
          console.log(position);
          var mailOptions = {
            from: 'donotreply@tradingandcoffeeapplication.com',
            to: email,
            subject: 'New Trading & Coffee Position Details',
            html: `<h3>Your new position details: </h3> 
            <br /> Symbol: ${position.symbol} 
            <br /> Operation: ${position.operation} 
            <br /> Start date: ${position.startDate}
            <br /> Estimated End date: ${position.endDate}
            <br /> Start Price: ${position.startPrice}
            <br />
            <br />
            <h4>Incase the position will end up false the system will give you the credit back automaticaly.</h4>          
            `
          };          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const sendClosePositionMail = async (email, position) => {
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        var transporter = nodemailer.createTransport({
          host: 'box2539.bluehost.com',
          port: 465,
          secure: true,
          auth: {
            user: 'donotreply@tradingandcoffeeapplication.com',
            pass: 'JOVANYFOREVEr34189696#@#'
          },
          tls : { rejectUnauthorized: false }
          });
          console.log(position);
          var mailOptions = {
            from: 'donotreply@tradingandcoffeeapplication.com',
            to: email,
            subject: 'Trading & Coffee Position Closed Details',
            html: `<h3>Your closed position details: </h3> 
            <br /> Symbol: ${position.symbol} 
            <br /> Operation: ${position.operation} 
            <br /> Start date: ${position.startDate}
            <br /> End date: ${position.endDate}
            <br /> Start Price: ${position.startPrice}
            <br /> End Price: ${position.endPrice}
            <br /> Success: ${position.succeeded}
            <br /> Pipsed/Cents: ${position.pipsed}

            `
          };          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    } catch(err) {
        console.log(err);
        throw err;
    }
}

module.exports = { sendEmail, getAllEmail, deleteEmail, sendRegisterationMail, sendPositionMail, sendClosePositionMail };
