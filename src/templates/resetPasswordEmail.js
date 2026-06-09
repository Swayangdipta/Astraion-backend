const resetPasswordEmail = (resetUrl) => {
    return `
        <div style="
            background:#f5f5f5;
            padding:40px 20px;
            font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
        ">
            <div style="
                max-width:650px;
                margin:auto;
                background:#ffffff;
                border-radius:24px;
                overflow:hidden;
                box-shadow:0 10px 40px rgba(0,0,0,0.06);
            ">

                <div style="
                    padding:50px;
                    text-align:center;
                    border-bottom:1px solid #f0f0f0;
                ">
                    <img
                        src="https://res.cloudinary.com/swayangdipta/image/upload/v1780996697/fullLogo_light_t4ptja.png"
                        alt="Astraion"
                        style="height:64px;"
                    />

                    <p style="
                        margin-top:24px;
                        color:#C7A86D;
                        letter-spacing:3px;
                        text-transform:uppercase;
                        font-size:12px;
                    ">
                        Security Center
                    </p>
                </div>

                <div style="padding:60px;">

                    <h1 style="
                        color:#111;
                        font-size:36px;
                        margin-top:0;
                        margin-bottom:20px;
                    ">
                        Reset Your Password
                    </h1>

                    <p style="
                        color:#555;
                        line-height:1.8;
                        font-size:16px;
                    ">
                        We received a request to reset the password for your Astraion account.
                    </p>

                    <p style="
                        color:#555;
                        line-height:1.8;
                        font-size:16px;
                    ">
                        If this was you, click the button below to continue.
                    </p>

                    <div style="margin:40px 0;">
                        <a
                            href="${resetUrl}"
                            style="
                                background:#111;
                                color:#ffffff;
                                text-decoration:none;
                                padding:16px 32px;
                                border-radius:12px;
                                display:inline-block;
                                font-weight:600;
                            "
                        >
                            Reset Password
                        </a>
                    </div>

                    <p style="
                        color:#888;
                        font-size:14px;
                    ">
                        This reset link will expire in 15 minutes.
                    </p>

                    <p style="
                        color:#888;
                        font-size:14px;
                        margin-top:20px;
                    ">
                        If you didn't request a password reset, you can safely ignore this email.
                    </p>

                </div>

                <div style="
                    padding:30px;
                    border-top:1px solid #f0f0f0;
                    text-align:center;
                ">
                    <p style="
                        margin:0;
                        color:#999;
                        font-size:13px;
                    ">
                        Astraion Security • Build. Organize. Evolve.
                    </p>
                </div>

            </div>
        </div>
    `;
};

export default resetPasswordEmail;