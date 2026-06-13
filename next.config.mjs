/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	optimizeFonts: false,
	productionBrowserSourceMaps: false,
	eslint: { ignoreDuringBuilds: true },
	typescript: { ignoreBuildErrors: true },
	experimental: {
		cpus: 1,
		workerThreads: false,
	},
};

export default nextConfig;
