import { extractFirstImage, getPostBySlug, getPostSlugs } from '@/lib/blog';
import { CompileMDXResult, compileMDX } from 'next-mdx-remote/rsc';
import { customMDXComponents } from '@/mdx-components'
import { Metadata } from 'next';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import ArticleHeader from './ArticleHeader';
import ArticleFooter from './ArticleFooter';
import rehypeHighlight from 'rehype-highlight';
// import python from '@/../@highlightjs/cdn-assets/languages/python.min.js'
import python from 'highlight.js/lib/languages/python'
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

// Force the pages in this route to be static.
export const dynamic = 'force-static';

export async function generateMetadata(
    { params }: Props,
    // parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const { content, metadata } = getPostBySlug(slug);

    const firstImage = extractFirstImage(content);
    const ogImage = firstImage || '/bonfire-24.jpg';

    return {
        metadataBase: new URL("https://jeff-m.com"),
        title: metadata.title,
        description: metadata.excerpt,
        openGraph: {
            title: metadata.title,
            description: metadata.excerpt,
            type: 'article',
            publishedTime: metadata.date,
            authors: "Jeffrey Morris",
            images: [
                {
                    url: ogImage,
                    alt: metadata.title
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: metadata.title,
            description: metadata.excerpt,
            images: [
                {
                    url: ogImage,
                    alt: metadata.title
                }
            ]
        }
    }
}

export async function generateStaticParams() {
    const posts = getPostSlugs();
    return posts.map((slug) => ({
        slug: slug.replace(/\.mdx?$/, ''),
    }));
}

type Props = {
    params: { slug: string };
};

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const { content, metadata, format } = getPostBySlug(slug);

    const result: CompileMDXResult = await compileMDX({
        source: content,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                format: format,
                remarkPlugins: [
                    remarkGfm, remarkMath],
                rehypePlugins: [
                    rehypeSlug,
                    [rehypeHighlight, { languages: { python } }],
                    rehypeKatex,
                ],
            },
        },
        components: customMDXComponents,
    });

    return (
        <article className='mx-auto px-4 py-8 max-w-3xl'>
            <ArticleHeader metadata={metadata} />
            {/* Post content */}
            <div className='prose dark:prose-invert prose-p:leading-relaxed max-w-none'>
                {result.content}
            </div>
            <ArticleFooter />
        </article>
    );
}