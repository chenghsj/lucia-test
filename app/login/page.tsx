'use client'

import { sendMailAction } from "@/action/sendMailAction";
import { Button } from "@/components/button";
import { Slot } from "@/components/opt-input";
import { varifyOTP } from "@/lib/verify-otp";
import { OTPInput } from "input-otp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
	const router = useRouter()
	const [showOTPInput, setShowOTPInput] = useState(false);
	const [email, setEmail] = useState('');

	const handleSendMail = async (formData: FormData) => {
		const result = await sendMailAction(formData);

		if (result.success) {
			setShowOTPInput(true);
			toast.success(result.message as string, {
				duration: 5000
			});
		} else {
			toast.error(result.message as string, {
				duration: 5000
			});
		}
	}

	const handleComplete = async (otp: string) => {
		const result = await varifyOTP(email, otp)
		if (result.success) {
			router.push('/')
		} else {
			toast.error(result.message, {
				duration: 5000
			});
		}
	}

	return (
		<div className="flex flex-col items-center justify-center h-full gap-6 divide-y w-64 m-auto">
			<div className="grid gap-4 w-full">
				<h1 className="font-bold">Sign in</h1>
				<Button className="w-full">
					<a href="/login/github">Sign in with GitHub</a>
				</Button>
				<Button>
					<a href="/login/google">Sign in with Google</a>
				</Button>
			</div>

			<form className="flex flex-col gap-3 pt-5 w-full" action={handleSendMail}>
				<label htmlFor="email" className="font-bold">Email OTP</label>
				<input
					className="border border-black rounded-lg p-3"
					type="email" name="email"
					placeholder="example@example.com"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<Button type='submit' className="text-white bg-black w-full">
					Send email
				</Button>
			</form>

			{showOTPInput && (
				<div className="grid gap-2 p-5">
					<h1 className="font-bold">Verify OTP</h1>
					<p className="text-sm text-gray-500">Enter the OTP sent to your email</p>
					<OTPInput
						onComplete={handleComplete}
						maxLength={6}
						containerClassName="group flex items-center has-[:disabled]:opacity-30"
						render={({ slots }) => (
							<>
								<div className="flex">
									{slots.slice(0, 6).map((slot, idx) => (
										<Slot key={idx} {...slot} />
									))}
								</div>
							</>
						)}
					/>
				</div>
			)}
		</div>
	);
}