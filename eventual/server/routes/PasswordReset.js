const express = require("express");

// This router will act as a controller for users
const routes = express.Router();

// Used for connecting to the database
const dbo = require("../db/conn");

// Used for converting id from string to ObjectId for the _id attribute
const ObjectId = require("mongodb").ObjectId;

const nodemailer = require('nodemailer');

// Registering a new user
PasswordReset.route('/forgot-password').post(async (req, response) => {
    const dbConnect = dbo.getDb();
    // TODO switch to non-mock users for release
    dbConnect.collection('mockUsers').findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (user == null) {
            response.status(403).send('Email not found');
        } else {
            const token = crypto.randomBytes(20).toString('hex');
            // TODO check if update adds fields
            user.update({
                PasswordResetToken: token,
                PasswordResetExpires: Date.now() + 1800000 // 30 minutes
            });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
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
                    console.error(err);
                } else {
                    response.status(200).json('email sent');
                }
            });
        }
    })
});