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
	experimental: {
		// Force the Next.js compiler to limit work to 1 thread/CPU
		// This stops it from spawning background threads that consume RAM
		cpus: 1,
		workerThreads: false,
	},
};

export default nextConfig;
