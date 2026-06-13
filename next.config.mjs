/** @type {import('next').NextConfig} */
const nextConfig = {
	// Disables ESLint checking during the production build
	eslint: {
		ignoreDuringBuilds: true,
	},
	// Disables TypeScript type checking errors during the production build
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
