const verificationEmail = (verificationUrl) => {
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
                        Business Technology Atelier
                    </p>
                </div>

                <div style="padding:60px;">

                    <h1 style="
                        color:#111;
                        font-size:36px;
                        margin-top:0;
                        margin-bottom:20px;
                    ">
                        Verify Your Email
                    </h1>

                    <p style="
                        color:#555;
                        line-height:1.8;
                        font-size:16px;
                    ">
                        Welcome to Astraion.
                    </p>

                    <p style="
                        color:#555;
                        line-height:1.8;
                        font-size:16px;
                    ">
                        To activate your account and access your workspace,
                        please verify your email address.
                    </p>

                    <div style="margin:40px 0;">
                        <a
                            href="${verificationUrl}"
                            style="
                                background:#C7A86D;
                                color:#111;
                                text-decoration:none;
                                padding:16px 32px;
                                border-radius:12px;
                                display:inline-block;
                                font-weight:600;
                            "
                        >
                            Verify Email
                        </a>
                    </div>

                    <p style="
                        color:#888;
                        font-size:14px;
                    ">
                        This verification link will expire in 24 hours.
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
                        Astraion • Build. Organize. Evolve.
                    </p>
                </div>

            </div>
        </div>
    `;
};

export default verificationEmail;
