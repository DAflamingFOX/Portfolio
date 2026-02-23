import React, { useState } from 'react';
import { Button } from '@heroui/react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
}

export const CopyIcon = ({
    fill = "currentColor",
    size,
    height,
    width,
    ...props
}: IconProps) => {
    return (
        <svg
            fill="none"
            height={size || height || 24}
            // viewBox="0 0 24 24"
            viewBox="0 -960 960 960"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                clipRule="evenodd"
                d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"
                fill={fill}
                fillRule='evenodd'
            />
        </svg>
    )
}

export const CheckIcon = ({
    fill = "currentColor",
    size,
    height,
    width,
    ...props
}: IconProps) => {
    return (
        <svg
            fill="none"
            height={size || height || 24}
            // viewBox="0 0 24 24"
            viewBox="0 -960 960 960"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                clipRule="evenodd"
                d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
                fill={fill}
                fillRule='evenodd'
            />
        </svg>
    )
}


export default function CopyButton({ textToCopy = "", timeout = 2000 }) {
    const [hasCopied, setHasCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            // Provide visual feedback
            setHasCopied(true);
            // Reset the button after some time.
            setTimeout(() => {
                setHasCopied(false);
            }, timeout);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <Button
            size='sm'
            isIconOnly
            onPress={handleCopy}
            color={hasCopied ? 'success' : 'primary'}
            variant='ghost'
        >
            <span className='relative flex items-center justify-center w-3.75 h-3.75'>
                <span className={`absolute trnsition-all duration-300 ease-in-out ${hasCopied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
                    <CopyIcon size={15} />
                </span>
                <span className={`absolute transition-all duration-300 ease-in-out ${hasCopied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} >
                    <CheckIcon size={15} />
                </span>
            </span>
        </Button>
    );
}