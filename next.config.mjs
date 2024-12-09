/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        port: process.env.PORT || 8080,
    },
};

export default nextConfig;
