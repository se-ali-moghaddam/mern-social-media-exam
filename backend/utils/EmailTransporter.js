import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.SYSTEM_EMAIL_ADDR,
        pass: process.env.SYSTEM_EMAIL_APP_PASS
    }
});