import { lucia, prisma } from "@/lib/auth";
import { generateIdFromEntropySize } from "lucia";
import { generateRandomString, alphabet } from "oslo/crypto";
import { createDate, TimeSpan } from "oslo";
import { cookies } from "next/headers";
import { sendMail } from "@/lib/mailer";

// export async function generateOTP(userId: string): Promise<string> {
// 	await prisma.emailOTP.delete({
// 		where: {
// 			userId
// 		}
// 	})
// 	const code = generateRandomString(6, alphabet("0-9"));
// 	await prisma.emailOTP.create({
// 		data: {
// 			userId,
// 			code,
// 			expiresAt: createDate(new TimeSpan(5, "m")) // 15 minutes
// 		}
// 	})

// 	return code;
// }

export async function POST(req: Request, res: Response): Promise<Response> {
	sendMail();
	return new Response(null);
	// const body = await req.json();
	// let userId = generateIdFromEntropySize(10);

	// let existingUser = await prisma.user.findUnique({
	// 	where: {
	// 		email: body.email
	// 	}
	// });

	// if (!existingUser) {
	// 	existingUser = await prisma.user.create({
	// 		data: {
	// 			id: userId,
	// 			email: body.email,
	// 			username: userId,
	// 		}
	// 	});
	// }

	// userId = existingUser.id;
	// const emailOTP = await generateOTP(existingUser.id);

	// // await sendVerificationCode(email, emailOTP);

	// const session = await lucia.createSession(userId, {});
	// const sessionCookie = lucia.createSessionCookie(session.id);
	// return new Response(null, {
	// 	status: 302,
	// 	headers: {
	// 		Location: "/",
	// 		"Set-Cookie": sessionCookie.serialize()
	// 	}
	// });

}