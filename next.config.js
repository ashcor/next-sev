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

        const legacyRedirects = (pfs, pfd) => [
            {
                source: `${pfs}/legacy/kola`,
                destination: `/shop/${pfd}/flavors/kola`,
                permanent: true,
            },
        ];

        const legacyCatchAllRedirects = (pfs, pfd) => [
            {
                source: `${pfs}/legacy/:slug*`,
                destination: `${pfd}/`,
                permanent: true,
            },
        ];

        const redirects = [
            ...legacyRedirects("", ""),
            ...legacyRedirects("/:country([a-z]{2})", "/:country"),
            ...legacyCatchAllRedirects("", ""),
            ...legacyCatchAllRedirects("/:country([a-z]{2})", "/:country"),
        ];

        return redirects;
    },
}

module.exports = nextConfig
