/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: process.env.OUTPUT == 'docker' ? 'standalone' : undefined,
    experimental: {
        //appDir: true,
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    async redirects() {
        return [
            {
                source: "/:country([a-z]{2})/legacy/kola",
                destination: "/shop/:country/flavors/kola",
                permanent: true,
            },
            {
                source: "/:country([a-z]{2})/legacy/:slug*",
                destination: "/:country",
                permanent: true,
            },
        ];
    },
}

module.exports = nextConfig
