const express = require("express");

// This router will act as a controller for users
const passwordResetRoutes = express.Router();

// Used for connecting to the database
const dbo = require("../db/conn");
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const crypto = require('crypto');

// sets user to have a token and sends email
passwordResetRoutes.route('/forgot-password').post(async (req, response) => {
    const dbConnect = dbo.getDb();


    dbConnect.collection("mockUsers").findOne({
            email: req.body.email
    }).then((user) => {
        if (user == null) {
            response.status(403).send('Email not found');
        } else {
            const token = crypto.randomBytes(20).toString('hex');
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

// returns user if password reset token is valid
passwordResetRoutes.route('/reset').post(async (req, response) => {
    const dbConnect = dbo.getDb();
    dbConnect.collection("mockUsers").findOne({
        PasswordResetToken: req.body.PasswordResetToken,
    }).then(user => {
  
        if (user == null || user.PasswordResetExpires < Date.now()) {
            response.status(401).json('Password reset has either expired or is not valid.');
        } else {
            response.status(200).json({
                username: user.username
            })
        }
    })
});

// updates password
passwordResetRoutes.route('/update-forgot-password').post(async (req, response) => {
    const dbConnect = dbo.getDb();
    const updatedHashedPassword = await bcrypt.hash(req.body.password, 10);
    dbConnect.collection("mockUsers").findOne({
        username: req.body.username
    }).then(user => {
        if (user != null) {
            const updatedUser = { $set: {
                password: updatedHashedPassword,
                PasswordResetExpires: null,
                PasswordResetToken: null
            }};
          
            dbConnect.collection("mockUsers").updateOne(user, updatedUser, (err, res) => {
              if (err) throw err;
              res.message = "Successfully updated password.";
              response.json(res);
            });
        } else {
            response.status(404).json("Error: User not found.");
        }
    })
});

module.exports = passwordResetRoutes;