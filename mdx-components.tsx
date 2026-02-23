import type { MDXComponents } from 'mdx/types'
import MDXLink from './components/MDXLink'

export const customMDXComponents: MDXComponents = {
    a: MDXLink,
    pre: ({ props, children }) => <pre className='p-0' {...props}>{children}</pre>
}

export function useMDXComponents(): MDXComponents {
    return customMDXComponents
}