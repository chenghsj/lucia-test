'use server'

import { cookies } from "next/headers"
import { lucia, prisma } from "../lib/auth"

export async function varifyOTP(email: string, code: string) {
	try {
		const existingUser = await prisma.user.findUnique({
			where: {
				email
			},
			include: {
				emailOTP: true
			}
		})

		if (!existingUser) {
			return {
				success: false,
				message: "User not found!"
			}
		}

		if (existingUser?.emailOTP?.code !== code) {
			return {
				success: false,
				message: "Invalid OTP!"
			}
		}

		if (existingUser?.emailOTP?.expiresAt < new Date()) {
			return {
				success: false,
				message: "OTP expired!"
			}
		}

		await prisma.emailOTP.deleteMany({
			where: {
				userId: existingUser.id
			}
		})

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

		return ({
			success: true,
			message: "OTP validated successfully!"
		})
	} catch (error: any) {
		return {
			success: false,
			message: "Failed to validate OTP!"
		}
	}
}
