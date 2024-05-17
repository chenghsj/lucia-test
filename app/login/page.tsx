"use client";

import { sendMailAction } from "@/action/send-mail-action";
import { Button } from "@/components/button";
import { Slot } from "@/components/opt-input";
import { Spinner } from "@/components/spinner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { varifyOTP } from "@/utils/verify-otp";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  // const [count, { startCountdown, stopCountdown, resetCountdown }] =
  // 	useCountdown({
  // 		countStart: 60,
  // 		intervalMs: 1000,
  // 	})

  const [isPending, startTransition] = useTransition();
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [email, setEmail] = useState("");

  // useEffect(() => {
  // 	if (count === 0) {
  // 		stopCountdown()
  // 		resetCountdown()
  // 		setShowOTPInput(false)
  // 	}
  // }, [count])

  const handleSendMail = async (formData: FormData) => {
    if (!email) return toast.error("Please enter an email address", { duration: 5000 });

    startTransition(async () => {
      const result = await sendMailAction(formData);
      setShowOTPInput(true);
      // startCountdown();
      if (result.code === 1) {
        toast.success(result.message as string, {
          duration: 5000,
        });
      } else if (result.code === 2) {
        toast.error(result.message as string, {
          duration: 5000,
        });
      } else {
        setShowOTPInput(false);
        toast.error(result.message as string, {
          duration: 5000,
        });
      }
    });
  };

  const handleComplete = async (otp: string) => {
    const result = await varifyOTP(email, otp);
    if (result.success) {
      router.push("/");
    } else {
      toast.error(result.message, {
        duration: 5000,
      });
    }
  };

  return (
    <div className="w-64 -translate-y-16">
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
        <label htmlFor="email" className="font-bold">
          Email OTP
        </label>
        <input
          className="border border-black rounded-lg p-3"
          type="email"
          name="email"
          placeholder="example@example.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Button
          type="submit"
          className="text-white bg-black w-full disabled:transition-none relative flex justify-center hover:bg-gray-800">
          {isPending ? (
            <>
              Sending email... <Spinner className="ml-2" />
            </>
          ) : (
            <>Send email</>
          )}
        </Button>
      </form>

      {showOTPInput && email && (
        <div className="grid gap-2 py-5">
          <h1 className="font-bold">Verify OTP</h1>
          <p className="text-sm text-gray-500">Enter the OTP sent to your email</p>
          <InputOTP onComplete={handleComplete} maxLength={6}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, idx) => (
                <InputOTPSlot key={idx} index={idx} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
      )}
    </div>
  );
}
