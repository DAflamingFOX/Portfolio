interface KnockoutHeadingDividerProps {
    lines?: number
    lineHeight?: string
    text?: string
    className?: string
}

export default function KnockoutHeadingDivider({
    lines = 0,
    lineHeight = 'h-[3px]',
    text = '',
    className = '',
}: KnockoutHeadingDividerProps) {
    const stripes = Array.from({ length: lines * 2 }).map((_, i) => (
        <div key={i} className={`${lineHeight} ${i % 2 === 0 ? 'bg-foreground' : 'bg-background'}`} />
    ));

    return (
        <div className={`w-full ${className}`}>
            {stripes}
            <div className="bg-foreground px-4 py-2 mb-2">
                <span className="text-transparent font-semibold text-3xl bg-background bg-clip-text">
                    {text}
                </span>
            </div>
        </div>
    );
};