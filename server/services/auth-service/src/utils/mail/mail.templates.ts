export const getOtpTemplate = (otp : string, otpExpiryTime:number,subject:string) => {
    return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your Verification Code</title>
        <style>
            body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
            color: #333;
            }

            .container {
            max-width: 480px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            }

            .header {
            background-color: #007bff;
            color: #ffffff;
            text-align: center;
            padding: 20px;
            font-size: 22px;
            font-weight: 600;
            }

            .content {
            padding: 24px;
            text-align: center;
            }

            .otp {
            display: inline-block;
            background: #f1f5ff;
            border: 1px solid #007bff;
            color: #007bff;
            font-size: 28px;
            letter-spacing: 4px;
            border-radius: 6px;
            padding: 12px 24px;
            margin: 16px 0;
            font-weight: bold;
            }

            .footer {
            font-size: 13px;
            color: #777;
            text-align: center;
            padding: 12px;
            border-top: 1px solid #eee;
            background-color: #fafafa;
            }

            @media (max-width: 600px) {
            .container {
                width: 95%;
            }
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">${subject}</div>
            <div class="content">
            <p>Hello,</p>
            <p>Your One-Time Password (OTP) for verification is:</p>
            <div class="otp">${otp}</div>
            <p>This OTP is valid for <strong>${otpExpiryTime / 60} minutes ${(otpExpiryTime % 60)*60 !=0 ? `${(otpExpiryTime % 60)*60} seconds` : ''}</strong>.</p>
            <p>If you did not request this, you can safely ignore this email.</p>
            <p>Thank you,<br />The Security Team</p>
            </div>
            <div class="footer">
            © 2025 Marketplace_Sass. All rights reserved.
            </div>
        </div>
        </body>
        </html>
    `
}

export const getForgetPasswordRequestTemplate = ( {resetLink,subject,tokenExpiryTime}: {resetLink: string,tokenExpiryTime: number,subject: string}) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Password Reset</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f9fafb;
          margin: 0;
          padding: 0;
          color: #333;
        }
  
        .container {
          max-width: 480px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
  
        .header {
          background-color: #007bff;
          color: #ffffff;
          text-align: center;
          padding: 20px;
          font-size: 22px;
          font-weight: 600;
        }
  
        .content {
          padding: 24px;
          text-align: center;
        }
  
        .btn {
          display: inline-block;
          background-color: #007bff;
          color: #ffffff !important;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          margin: 16px 0;
        }
  
        .footer {
          font-size: 13px;
          color: #777;
          text-align: center;
          padding: 12px;
          border-top: 1px solid #eee;
          background-color: #fafafa;
        }
  
        @media (max-width: 600px) {
          .container {
            width: 95%;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">${subject}</div>
  
        <div class="content">
          <p>Hello,</p>
          <p>We received a request to reset your password.</p>
  
          <a href="${resetLink}" class="btn">Reset Password</a>
  
          <p>
            This link is valid for
            <strong>${tokenExpiryTime} minutes</strong>.
          </p>
  
          <p>If you did not request this, you can safely ignore this email.</p>
  
          <p>Thank you,<br />The Security Team</p>
        </div>
  
        <div class="footer">
          © 2025 Marketplace_Sass. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `;
  };
  