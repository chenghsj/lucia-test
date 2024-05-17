"use server";

import { TimeSpan, generateIdFromEntropySize } from "lucia";
import { prisma } from "@/lib/auth";
import { alphabet, generateRandomString } from "oslo/crypto";
import { createDate } from "oslo";
import { sendMail } from "@/utils/send-mail";
import { EmailOTP, User } from "@prisma/client";

export async function sendMailAction(formData: FormData) {
  let userId = generateIdFromEntropySize(10);
  const email = formData.get("email") as string;

  try {
    let existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        emailOTP: true,
      },
    });

    if (existingUser?.emailOTP?.expiresAt! > new Date()) {
      return {
        code: 2,
        success: false,
        message: "Email already sent. Please check your email.",
      };
    }

    if (!existingUser) {
      existingUser = (await prisma.user.create({
        data: {
          id: userId,
          email,
          username: userId,
        },
      })) as User & { emailOTP: EmailOTP };
    }

    const emailOTP = await generateOTP(existingUser.id);

    await sendMail({ to: email, validationCode: emailOTP });
    return {
      code: 1,
      success: true,
      message: "Email sent successfully!",
    };
  } catch (error: any) {
    console.error({ error });
    return {
      code: 0,
      success: false,
      message: "Failed to send email!",
    };
  }
}

async function generateOTP(userId: string): Promise<string> {
  await prisma.emailOTP.deleteMany({
    where: {
      userId,
    },
  });
  const validationCode = generateRandomString(6, alphabet("0-9"));
  await prisma.emailOTP.create({
    data: {
      userId,
      code: validationCode,
      expiresAt: createDate(new TimeSpan(5, "m")), // 5 minutes
    },
  });

  return validationCode;
}
