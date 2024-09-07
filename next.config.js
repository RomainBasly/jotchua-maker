/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.node$/, // Adjust regex based on file type
      use: "node-loader", // Specify the loader to use
    });

    return config;
  },
};

module.exports = nextConfig;
