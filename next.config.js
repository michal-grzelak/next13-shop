/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "naszsklep-api.vercel.app",
				pathname: "/images/**",
			},
			{
				protocol: "https",
				hostname: "api.hyperfunctor.com",
				pathname: "/uploads/**",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: false,
			},
		]
	},
}

module.exports = nextConfig
