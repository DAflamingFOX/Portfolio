import { ReactNode } from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
}

export const LinkIcon = ({
    fill = "currentColor",
    size,
    height,
    width,
    ...props
}: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size || height || 24}
            width={size || width || 24}
            viewBox="0 -960 960 960"
            fill="none"
        >
            <path
                clipRule="evenodd"
                fill={fill}
                fillRule='evenodd'
                d="M318-120q-82 0-140-58t-58-140q0-40 15-76t43-64l134-133 56 56-134 134q-17 17-25.5 38.5T200-318q0 49 34.5 83.5T318-200q23 0 45-8.5t39-25.5l133-134 57 57-134 133q-28 28-64 43t-76 15Zm79-220-57-57 223-223 57 57-223 223Zm251-28-56-57 134-133q17-17 25-38t8-44q0-50-34-85t-84-35q-23 0-44.5 8.5T558-726L425-592l-57-56 134-134q28-28 64-43t76-15q82 0 139.5 58T839-641q0 39-14.5 75T782-502L648-368Z"
            />
        </svg>
    )
}

type HeadingProps = {
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    id?: string;
    children: ReactNode;
    className?: string;
}

export default function MDXHeading({ level, id, children, ...props }: HeadingProps) {
    const Tag = level;

    return (
        <Tag className='group scroll-mt-20 flex flex-row justify-between items-center' id={id} {...props}>
            <div>
                {children}
            </div>
            {id && (
                <a
                    href={`#${id}`}
                    className='opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity'
                    aria-label='Link to section'
                >
                    <LinkIcon />
                </a>
            )}
        </Tag>
    )

}