import { cn } from "@/utils/cn"
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react"

export const Button: FC<DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>> = ({ children, ...props }) => {
	return (
		<button {...props} className={cn("border rounded-lg px-4 py-1 hover:bg-slate-200 transition-all", props.className)}>
			{children}
		</button>
	)
}