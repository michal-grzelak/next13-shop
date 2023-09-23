import "./globals.css"
import { Inter } from "next/font/google"

import type { Metadata } from "next"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
})

export const metadata: Metadata = {
	title: "Next13 Shop",
	description: "Next13 Shop",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${inter.variable}`}>
			<body className={`container mx-auto min-h-screen bg-white sm:px-8 md:px-16 lg:px-24`}>
				{children}
			</body>
		</html>
	)
}
