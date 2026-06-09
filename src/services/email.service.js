import resend from "../config/mail.js";

export const sendEmail = async ({
    to,
    subject,
    html,
}) => {

    const response =
        await resend.emails.send({
            from: 'Astraion <onboarding@resend.dev>',
            to,
            subject,
            html,
        });

    return response;
};