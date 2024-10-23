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

        // same as redirects but just hardcode the values
        const redirects2 = [
            // {
            //     source: "/legacy/kola",
            //     destination: "/shop/flavors/kola",
            //     permanent: true,
            // },
            {
                source: "/:country([a-z]{2})/legacy/kola",
                destination: "/shop/:country/flavors/kola",
                permanent: true,
            },
            // {
            //     source: "/legacy/:slug*",
            //     destination: "/",
            //     permanent: true,
            // },
            {
                source: "/:country([a-z]{2})/legacy/:slug*",
                destination: "/:country",
                permanent: true,
            },
        ];

        return redirects2;
    },
}

module.exports = nextConfig
