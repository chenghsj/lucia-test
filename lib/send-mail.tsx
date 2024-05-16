import nodemailer from "nodemailer";
import VerifyIdentityEmail from "@/components/mail-template";
import { render } from "@react-email/render";

export async function sendMail({ to, validationCode }: { to: string, validationCode: string }) {
	const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

	const transport = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: SMTP_EMAIL,
			pass: SMTP_PASSWORD,
		},
	});
	try {
		const testResult = await transport.verify();
	} catch (error) {
		console.log({ error });
		return;
	}

	try {
		const sendResult = await transport.sendMail({
			from: SMTP_EMAIL,
			to,
			subject: 'Sign in to your account',
			html: render(<VerifyIdentityEmail validationCode={validationCode} />),
		});
	} catch (error) {
		console.log(error);
	}
}