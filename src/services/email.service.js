import resend from "../config/mail.js";

export const sendEmail = async ({
    to,
    subject,
    html,
}) => {

    const response =
        await resend.emails.send({
            from:
                process.env.EMAIL_FROM,
            to,
            subject,
            html,
        });

    return response;
};