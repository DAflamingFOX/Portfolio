'use client';

import { Chip } from '@heroui/react';
import { Link } from '@heroui/react';
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import type { Post } from '@/lib/blog'

type Props = {
    posts: Post[];
};

export default function BlogList({ posts }: Props) {
    return (
        <div className='w-full grid justify-center gap-12
        md:grid-cols-[repeat(2,minmax(0,28rem))]
    lg:grid-cols-[repeat(3,minmax(0,28rem))]'>
            {posts.map((post) => (
                <Card key={post.slug} className='w-full max-w-md min-h-64 justify-between'>
                    <CardHeader className='flex flex-col gap-y-2 items-start'>
                        <h2>{post.metadata.title}</h2>
                        <p className='text-secondary-600'>{post.metadata.excerpt}</p>
                    </CardHeader>
                    <CardBody className='flex flex-row gap-2'>
                        {post.metadata.tags.map((tag) => (
                            <Link key={tag} href={`/blog/tag/${tag}`}>
                                <Chip variant='bordered' color='secondary'>
                                    {tag}
                                </Chip>
                            </Link>
                        ))}
                    </CardBody>
                    <CardFooter className='flex flex-row justify-between'>
                        <Link href={`/blog/${post.slug}`} showAnchorIcon >Read article</Link>
                        <p className='text-foreground-400'>{
                            new Date(post.metadata.date).toLocaleDateString([], {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}