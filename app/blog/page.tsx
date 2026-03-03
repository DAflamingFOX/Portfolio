import { getAllPosts } from '@/lib/blog';
import BlogList from './BlogList';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Blog",
    description: "The inner machinations of my mind.",
    openGraph: {
        title: "Blog",
        description: "The inner machinations of my mind.",
        images: [
            {
                url: "/bonfire-24.jpg"
            }
        ]
    }
}

export default function BlogIndexPage() {
    const posts = getAllPosts();

    return (
        <>
            <div className='flex flex-col gap-y-4 px-8 py-8'>
                <div className='flex flex-col gap-y-4 pb-8'>
                    <h1>All Posts</h1>
                    <p className='text-foreground-400'>The inner machinations of my mind...</p>
                </div>

                <BlogList posts={posts} />
            </div>

        </>
    );

}