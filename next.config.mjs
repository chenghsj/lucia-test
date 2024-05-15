/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	env: {
		DATABASE_URL: process.env.DATABASE_URL,
		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
		MAILTRAP_TOKEN: process.env.MAILTRAP_TOKEN,
		MAILTRAP_USERNAME: process.env.MAILTRAP_USERNAME,
		MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD,
		SENDER_EMAIL: process.env.SENDER_EMAIL,
		RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL,
	}
};

export default nextConfig;
