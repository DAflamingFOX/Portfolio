import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        globalNotFound: true,
    },
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
    options: {
        remarkPlugins: [
            'remark-frontmatter',
            'remark-math'
        ],
        rehypePlugins: [
            'rehype-katex'
        ]
    },
    extension: /\.(md|mdx)$/,
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig);