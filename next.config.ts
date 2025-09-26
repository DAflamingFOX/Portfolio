/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            // Buisness card redirect.
            {
                source: '/biz_card',
                destination: '/',
                permanent: true,
            },

        ]
    },
}

// Merge MDX config with Next.js config
export default nextConfig;