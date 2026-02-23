'use client';

import { Link as HeroLink } from '@heroui/react';
import NextLink from 'next/link';


export default function MDXLink({ href, children, ...props }: any) {
    return (
        <HeroLink as={NextLink} href={href}  {...props}>
            {children}
        </HeroLink>
    );
}