/** @type {import('next').NextConfig} */
const nextConfig = {
	// Bypasses the next-font-loader network/cache JSON parsing crash entirely
	optimizeFonts: false,

	swcMinify: true,
	productionBrowserSourceMaps: false,
	eslint: { ignoreDuringBuilds: true },
	typescript: { ignoreBuildErrors: true },
	experimental: {
		cpus: 1,
		workerThreads: false,
	},
};

export default nextConfig;
