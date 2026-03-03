import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'markdown/blog');

export type PostMetadata = {
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
}

export type Post = {
    slug: string;
    metadata: PostMetadata
    content: string;
    format: 'md' | 'mdx';
};

export function getPostSlugs() {
    return fs.readdirSync(postsDir);
}

export function getPostBySlug(slug: string): Post {
    const realSlug = slug.replace(/\.mdx?$/, ''); // Remove .md or .mdx

    // check if mdx
    let fullPath = path.join(postsDir, `${realSlug}.mdx`);
    let format: 'md' | 'mdx' = 'mdx'; // Default to mdx

    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(postsDir, `${realSlug}.md`)
        format = 'md';
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        metadata: {
            ...data,
            date: data.date instanceof Date ? data.date.toISOString() : new Date(data.date).toISOString(),
        } as PostMetadata,
        content,
        format,
    };
}

export function getAllPosts(): Post[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .filter((slug) => slug.match(/\.mdx?$/))
        .map((slug) => getPostBySlug(slug))
        .sort((post1, post2) => (post1.metadata.date > post2.metadata.date ? -1 : 1));
    return posts
}

export function getPostsByTag(tag: string): Post[] {
    const allPosts = getAllPosts();
    return allPosts.filter(post => post.metadata.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()));
}

export function extractFirstImage(content: string): string | null {
    // Matches both ![alt](url) and <img src="url" />
    const imgRegex = /!\[.*?\]\((.*?)\)|<img.*?src=["'](.*?)["']/;
    const match = content.match(imgRegex);

    if (match) {
        return match[1] || match[2]; // match[1] for Markdown, match[2] for HTML
    }

    return null; // Fallback if no image exists
}