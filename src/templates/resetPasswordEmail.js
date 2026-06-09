const resetPasswordEmail = (
    resetUrl
) => {

    return `
        <div>
            <h2>
                Reset Password
            </h2>

            <p>
                Click below:
            </p>

            <a href="${resetUrl}">
                Reset Password
            </a>

            <p>
                Link expires in 15 minutes.
            </p>
        </div>
    `;
};

export default resetPasswordEmail;