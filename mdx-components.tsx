import type { MDXComponents } from 'mdx/types'
import MDXLink from './components/MDXLink'

const components: MDXComponents = {
    a: MDXLink,
    pre: ({ props, children }) => <pre className='p-0' {...props}>{children}</pre>
}

export function useMDXComponents(): MDXComponents {
    return components
}