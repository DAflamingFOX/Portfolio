'use client';

import { Link as HeroLink } from '@heroui/react';
import NextLink from 'next/link';
import { ComponentProps } from 'react';

export default function MDXLink({ href, children, ...props }: ComponentProps<'a'>) {
    return (
        <HeroLink as={NextLink} href={href || '#'}  {...(props as unknown as ComponentProps<typeof HeroLink>)}>
            {children}
        </HeroLink>
    );
}