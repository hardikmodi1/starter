import * as nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string) {
	const testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass // generated ethereal password
		}
	});

	const info = await transporter.sendMail({
		from: '"Fred Foo 👻" <foo@example.com>', // sender address
		to: email, // list of receivers
		subject: "Email confirmation", // Subject line
		text: "Hello world?", // plain text body
		html: `click <a href="${url}">here</a> to confirm your email address` // html body
	});

	console.log("Message sent: %s", info.messageId);
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
