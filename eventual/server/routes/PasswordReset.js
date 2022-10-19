const express = require("express");

// This router will act as a controller for users
const passwordResetRoutes = express.Router();

// Used for connecting to the database
const dbo = require("../db/conn");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Registering a new user
passwordResetRoutes.route('/forgot-password').post(async (req, response) => {
    const dbConnect = dbo.getDb();
    // TODO switch to non-mock users for release
    console.log('Attempting to send email to ', req.body.email);

    dbConnect.collection("mockUsers").findOne({
            email: req.body.email
    }).then((user) => {
        console.log(user);
        if (user == null) {
            response.status(403).send('Email not found');
        } else {
            const token = crypto.randomBytes(20).toString('hex');
            // TODO check if update adds fields

            dbConnect.collection("mockUsers").updateOne(
                { email: req.body.email },
                { $set:
                   {
                    PasswordResetToken: token,
                    PasswordResetExpires: Date.now() + 1800000 // 30 minutes
                   }
                }
            );

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: 'true',
                auth: {
                    user: `${process.env.EMAIL}`,
                    pass: `${process.env.PASSWORD}`
                }
            });

            const mailOptions = {
                from: `${process.env.EMAIL}`,
                to: `${user.email}`,
                subject: 'Eventual - Reset Password',
                text: 'Click the link below within 30 minutes of receiving it to reset your Eventual password:\n\n'
                    + `http://localhost:3000/reset-password/${token}`
            };

            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error("Could not send:", err);
                } else {
                    response.status(200).json('email sent');
                }
            });
        }
    })
});

module.exports = passwordResetRoutes;