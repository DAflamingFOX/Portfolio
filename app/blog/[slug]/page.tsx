import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { CompileMDXResult, compileMDX } from 'next-mdx-remote/rsc';
import { customMDXComponents } from '@/mdx-components'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import ArticleHeader from './ArticleHeader';
import ArticleFooter from './ArticleFooter';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

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
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [rehypeKatex, rehypeHighlight],
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