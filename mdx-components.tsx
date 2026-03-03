import type { MDXComponents } from 'mdx/types'
import Image from 'next/image';
import MDXLink from './components/MDXLink'
import MDXHeading from './components/MDXHeading'

export const customMDXComponents: MDXComponents = {
    a: MDXLink,
    img: (props) => (
        <Image
            src={props.src || ''}
            alt={props.alt || "Unknown Image"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="rounded-md my-8"
        />
    ),
    pre: ({ props, children }) => <pre className='p-0' {...props}>{children}</pre>,
    h1: ({ props, id, children }) => <MDXHeading level="h1" id={id} {...props}>{children}</MDXHeading>,
    h2: ({ props, id, children }) => <MDXHeading level="h2" id={id} {...props}>{children}</MDXHeading>,
    h3: ({ props, id, children }) => <MDXHeading level="h3" id={id} {...props}>{children}</MDXHeading>,
    h4: ({ props, id, children }) => <MDXHeading level="h4" id={id} {...props}>{children}</MDXHeading>,
    h5: ({ props, id, children }) => <MDXHeading level="h5" id={id} {...props}>{children}</MDXHeading>,
    h6: ({ props, id, children }) => <MDXHeading level="h6" id={id} {...props}>{children}</MDXHeading>,
}

export function useMDXComponents(): MDXComponents {
    return customMDXComponents
}