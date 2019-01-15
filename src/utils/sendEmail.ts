import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandbox41d24f01f8fe4054b26e169705d363af.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "jinyeong32@gmail.com",
    to: "jinyeong32@gmail.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullname: string, key: string) => {
  const emailSubject = `Hello, ${fullname}! Please verify your email account.`;
  const emailBody = `Verify your email account by clicking <a href="http://nuber.com/verification/${key}/">here</a>`;
  return sendEmail(emailSubject, emailBody);
};
