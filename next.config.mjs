/** @type {import('next').NextConfig} */
const nextConfig = {
	// Use Rust-based compiler optimizations to drastically drop RAM usage
	swcMinify: true,

	// Disable source map generation to conserve memory during compilation
	productionBrowserSourceMaps: false,

	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	experimental: {
		cpus: 1,
		workerThreads: false,
	},
};

export default nextConfig;
