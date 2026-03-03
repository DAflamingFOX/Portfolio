import { getPostsByTag } from '@/lib/blog';
import BlogList from './../../BlogList';
import Link from 'next/link';
import { Metadata } from 'next';

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    // parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const decodedTag = decodeURI(slug);

    return {
        title: `Posts tagged '${decodedTag}'`,
        description: `Filter blogs tagged by '${decodedTag}'`,
        openGraph: {
            title: `Posts tagged '${decodedTag}'`,
            description: `Filter blogs tagged by '${decodedTag}'`,
            type: 'website',
            images: [
                {
                    url: '/bonfire-24.jpg'
                }
            ]
        },
    }
}

export default async function BlogTagPage({ params }: Props) {
    const { slug } = await params;
    const decodedTag = decodeURIComponent(slug);
    const posts = getPostsByTag(decodedTag)

    return (
        <>
            <div className='flex flex-col gap-y-4 px-8 py-8'>
                <div className='flex flex-col gap-y-4 pb-8'>
                    <h1>{`Posts tagged '${decodedTag}'`}</h1>
                    <Link href='/blog/' className='text-primary-400 hover:underline'>View all posts</Link>
                </div>

                <div className='grow flex flex-col items-center'>
                    <BlogList posts={posts} />
                </div>
            </div>
        </>
    )
}