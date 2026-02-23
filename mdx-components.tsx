import type { MDXComponents } from 'mdx/types'
import MDXLink from './components/MDXLink'

export const customMDXComponents: MDXComponents = {
    a: MDXLink,
    pre: ({ props, children }) => <pre className='p-0' {...props}>{children}</pre>,
    h1: ({ props, id, children }) => <h1 className='scroll-mt-20' id={id} {...props}>{children}</h1>,
    h2: ({ props, id, children }) => <h2 className='scroll-mt-20' id={id} {...props}>{children}</h2>,
    h3: ({ props, id, children }) => <h3 className='scroll-mt-20' id={id} {...props}>{children}</h3>,
    h4: ({ props, id, children }) => <h4 className='scroll-mt-20' id={id} {...props}>{children}</h4>,
    h5: ({ props, id, children }) => <h5 className='scroll-mt-20' id={id} {...props}>{children}</h5>,
    h6: ({ props, id, children }) => <h6 className='scroll-mt-20' id={id} {...props}>{children}</h6>,
}

export function useMDXComponents(): MDXComponents {
    return customMDXComponents
}