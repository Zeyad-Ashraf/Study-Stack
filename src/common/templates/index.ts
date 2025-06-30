export const htmlTemplateForConfirmation = (
  otp: string,
  subject: string,
  forWhat: string,
) => `
            <div style="width: 91%; height:190px; background-color: #a52a2a; color: white; text-align: center; padding: 15px; border-radius: 10px; font-family: Arial, sans-serif;">
                <h2 style="margin: 0;">${subject}</h2>
                <div style="background-color: white; color: black; padding: 15px; font-size: 20px; font-weight: bold; margin: 10px 0; border-radius: 5px;">
                    ${otp}
                </div>
                <p style="margin: 0;">${forWhat}.</p>
                <a href="https://example.com" style="color: white; text-decoration: none; font-weight: bold;">Resend OTP</a>
                <p style="margin: 2px 0;">This OTP is valid for 10 minutes.</p>
            </div>
`;

export const htmlTemplateForSlientRegister = (
  letter: string,
  subject: string,
) => `
            <div style="width: 91%; height:190px; background-color: #a52a2a; color: white; text-align: center; padding: 15px; border-radius: 10px; font-family: Arial, sans-serif;">
                <h2 style="margin: 0;">${subject}</h2>
                <div style="background-color: white; color: black; padding: 15px; font-size: 20px; font-weight: bold; margin: 10px 0; border-radius: 5px;">
                    ${letter}
                </div>
                <p style="margin: 0;">Powered By Mailer.</p>
            </div>
`;
