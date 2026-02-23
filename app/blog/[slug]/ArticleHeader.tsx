'use client';

import type { PostMetadata } from "@/lib/blog"
import { Chip, Divider } from "@heroui/react"
import { Link } from "@heroui/react"

type Props = {
    metadata: PostMetadata
}

export default function ArticleHeader({ metadata }: Props) {
    return (
        <>
            <div className='flex flex-col gap-y-0.5 mb-4'>
                <div className='flex flex-col md:flex-row justify-between items-baseline'>
                    <h4 className='text-secondary-600'>
                        {new Date(metadata.date).toLocaleDateString([], {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </h4>
                    <div className="flex flex-row flex-wrap gap-2">
                        {metadata.tags.map((tag) => (
                            <Link key={tag} href={`/blog/tag/${tag}`}>
                                <Chip key={tag} variant='bordered' color='secondary'>{tag}</Chip>
                            </Link>
                        ))}
                    </div>
                </div>
                <h1>
                    {metadata.title}
                </h1>
                <h4 className='text-secondary-600'>
                    {metadata.excerpt}
                </h4>
            </div>
            <Divider className="mb-4" />
        </>
    )
}