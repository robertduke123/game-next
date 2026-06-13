/** @type {import('next').NextConfig} */
const nextConfig = {
	// Keeps Rust compilation fast and light on RAM
	swcMinify: true,
	optimizeFonts: false,
	productionBrowserSourceMaps: false,
	eslint: { ignoreDuringBuilds: true },
	typescript: { ignoreBuildErrors: true },

	experimental: {
		cpus: 1,
		workerThreads: false,
	},

	// Inject a Webpack rule to neutralize next-font-loader completely
	webpack: (config, { isServer }) => {
		config.module.rules.push({
			test: /next-font-loader/,
			use: "null-loader", // Safely voids the module out so it can't execute or crash
		});
		return config;
	},
};

export default nextConfig;
