import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpry: new Date(Date.now() + 3600000),
        },
      });
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "865f701bdd456b",
        pass: "b3838f9657bd12",
      },
    });

    const mailOptions = {
      from: "aloneking5388@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">Here</a> to ${
        emailType === "VERIFY" ? "verify your account" : "reset your password"
      }
                or copy and paste the link below in Your browser .
                 <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                 </p>`,
    };
    const mailRespons = await transport.sendMail(mailOptions);

    return mailRespons;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
