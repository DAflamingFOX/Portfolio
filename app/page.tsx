'use client';

import { useEffect } from 'react';
import { easeInOut, motion, MotionConfig, useAnimation } from 'framer-motion';
import { Image, Link } from '@heroui/react';

export default function Page() {
    const barControls = useAnimation();
    const textControls = useAnimation();
    const imgControls = useAnimation();
    const linesControls = useAnimation();

    const containerVariants = {
        hidden: {},
        complete: {
            transition: {
                staggerChildren: 0.75, // delay between lines
            },
        },
    };

    const lineVariants = {
        hidden: { y: "100%", opacity: 0 },
        complete: {
            y: "0%",
            opacity: 1,
            transition: { duration: 1, easeInOut },
        },
    };

    const lines = [
        <h3 key={'student'}>{"I'm a student"}</h3>,
        <h3 key={'ee'}>{"I'm an electrical engineer"}</h3>,
        <h3 key={'ese'}>{"I'm an embeded software engineer"}</h3>,
        <h3 key={'robot'}>{"I'm a robotics enthusiast"}</h3>,
        <h3 key={'action'}>{"Check me out:"}</h3>,
        <div key={'links'}  className='inline-flex flex-row gap-x-4'>
            <Link className='text-2xl' href="/portfolio"> Portfolio </Link>
            <Link className='text-2xl' href="/resume"> Resume </Link>
            <Link className='text-2xl' href="/contact_me"> Contact Me </Link>
        </div>,
    ];

    useEffect(() => {
        const startAnimation = async () => {
            barControls.start('complete');
            await new Promise(r => setTimeout(r, 500));
            textControls.start('complete');
            await new Promise(r => setTimeout(r, 500));
            imgControls.start('complete');
            await new Promise(r => setTimeout(r, 500));
            linesControls.start('complete');
        }

        if (document.readyState === "complete") {
            startAnimation();
        } else {
            window.addEventListener("load", startAnimation);
            return () => window.removeEventListener("load", startAnimation);
        }
    }, [barControls, textControls, imgControls, linesControls]);


    return (
        <>
            <div className='content'>
                <MotionConfig transition={{
                    duration: 1.5,
                    ease: 'easeInOut'
                }}>
                    <div className='flex flex-row gap-x-8 justify-between w-full'>
                        <div className='inline-flex flex-col shrink-0 gap-y-8'>

                            <div className="inline-flex flex-col items-start w-fit">
                                {/* The Bar */}
                                <motion.div
                                    className="h-0.5 bg-foreground rounded-full origin-left w-full"
                                    initial={{
                                        scaleX: 0
                                    }}
                                    variants={{
                                        complete: { scaleX: 1 }
                                    }}
                                    animate={barControls}
                                />
                                {/* My name */}
                                <motion.div
                                    className="mr-8 text-4xl font-bold"
                                    initial={{
                                        opacity: 0,
                                    }}
                                    variants={{
                                        complete: { opacity: 1 }
                                    }}
                                    animate={textControls}
                                >
                                    {`Howdy, I'm Jeffrey`}
                                </motion.div>
                            </div>

                            {/* Lines Container */}
                            <motion.div
                                variants={containerVariants}
                                initial='hidden'
                                animate={linesControls}
                                className='flex flex-col gap-y-8'
                            >
                                {lines.map((text, i) => (
                                    <div key={i} className='overflow-hidden'>
                                        <motion.div
                                            className='inline-block'
                                            variants={lineVariants}
                                        >
                                            {text}
                                        </motion.div>
                                    </div>
                                ))}
                            </motion.div>

                        </div>

                        <motion.div
                            className='shrink'
                            initial={{
                                opacity: 0,
                            }}
                            variants={{
                                complete: { opacity: 1 }
                            }}
                            animate={imgControls}
                        >
                            <Image src='/Headshot_States_Up.jpg' alt='Headshot' />
                        </motion.div>
                    </div>

                </MotionConfig>
            </div>
        </>

    );
}