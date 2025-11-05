import nodemailer from 'nodemailer';
import {WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    }
})

export const sendWelcomeEmail = async ({email,name,intro}:WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}',name)
        .replace('{{intro}}',intro);

    const mailOptions = {
        from:`"Stoxly" <vpsines1001@gmail.com`,
        to:email,
        subject:"Welcome to Stoxly - your complete market toolkit!",
        text:'Thanks for joining Stoxly',
        html:htmlTemplate
    }

    await transporter.sendMail(mailOptions);
}