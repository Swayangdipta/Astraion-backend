const verificationEmail = (
    verificationUrl
) => {

    return `
        <div>
            <h2>
                Verify Email
            </h2>

            <p>
                Click below to verify
                your email.
            </p>

            <a href="${verificationUrl}">
                Verify Email
            </a>

            <p>
                Link expires in 24 hours.
            </p>
        </div>
    `;
};

export default verificationEmail;