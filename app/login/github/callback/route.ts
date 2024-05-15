import { github, lucia, prisma } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";

type GitHubUser = {
	id: string;
	login: string;
	avatar_url: string;
}

type GitHubEmail = {
	email: string,
	primary: boolean,
	verified: boolean,
	visibility: string
}

type GitHubEmails = GitHubEmail[]

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	console.log("url", url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("github_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		})
		const githubEmailResponse = await fetch("https://api.github.com/user/emails", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();
		const githubEmails: GitHubEmails = await githubEmailResponse.json();
		const githubEmail = githubEmails.find((email) => email.primary && email.verified);
		console.log(githubEmail, githubUser);
		if (!githubEmail || !githubUser.id) {
			return new Response(null, {
				status: 401
			});
		}
		// Replace this with your own DB client.
		const existingUser = await prisma.user.findUnique({
			where: {
				email: githubEmail.email
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
				email: githubEmail.email,
				username: githubUser.login,
				avatarURL: githubUser.avatar_url
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
		console.log(e);
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