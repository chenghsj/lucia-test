import { google, lucia, prisma } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";

interface GoogleUser {
	name: string;
	picture: string;
	email: string;
}

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const codeVerifier = cookies().get("code_verifier")?.value ?? null;
	const storedState = cookies().get("google_oauth_state")?.value ?? null;
	if (!code || !state || !codeVerifier || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, codeVerifier);
		const githubUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const googleUser: GoogleUser = await githubUserResponse.json();
		console.log(googleUser);
		// Replace this with your own DB client.
		const existingUser = await prisma.user.findUnique({
			where: {
				email: googleUser.email
			}
		});

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/"
				}
			});
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long

		// Replace this with your own DB client.
		await prisma.user.create({
			data: {
				id: userId,
				email: googleUser.email,
				username: googleUser.name,
				avatarURL: googleUser.picture
			}
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

