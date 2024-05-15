'use client'

import { HTMLAttributes, FC } from "react";

export default function Page() {
	const handleSendMail = () => {
		console.log('clicked');
		fetch("/login/email", {
			method: "POST",
		}).then(() => {
			console.log("Mail sent")
		})
	}

	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-4">
			<h1>Sign in</h1>
			<Button>
				<a href="/login/github">Sign in with GitHub</a>
			</Button>
			<Button>
				<a href="/login/google">Sign in with Google</a>
			</Button>
			<Button onClick={handleSendMail} >
				Send Mail
			</Button>
		</div>
	);
}


const Button: FC<HTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
	return (
		<button {...props} className="border rounded-lg px-4 py-1 hover:bg-slate-200 transition-all">
			{children}
		</button>
	)
}