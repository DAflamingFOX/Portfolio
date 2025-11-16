'use client';

import KnockoutHeadingDivider from "@/components/KnockoutHeadingDivider";
import { Divider, Link } from "@heroui/react";

export default function Page() {
    return (
        <>
            <div className="content">
                <h1>Welcome</h1>
                <KnockoutHeadingDivider lines={3} text="Howdy, I'm Jeffrey" />
                <div className="my-4 flex flex-col gap-y-2 text-xl">
                    {/* <div>
                        <i>I'm actively looking for a <b>summer internship</b> or full-time job upon graduation.</i> <br />
                    </div> */}
                    <div>
                        I&apos;m an <b>electrical engineering</b> major at Tarleton State University. <br />
                    </div>
                    <div>
                        I design, build, and write firmware for <b>custom PCBs</b> (printed circuit boards). <br />
                    </div>
                    <div>
                        I&apos;m a <b>FIRST alumni</b>, and robotics enthusiast.
                    </div>
                </div>
                <KnockoutHeadingDivider lines={0} text="Learn more" />
                <div>
                    <div className="my-4 grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-6">
                        <h3 className="text-right">Blog</h3>
                        <Divider orientation="vertical" />
                        <div className="flex flex-col justify-between h-auto">
                            <p>Check out my random writings and other works. (coming soon)</p>
                            <Link isDisabled showAnchorIcon href="/blog">Link</Link>
                        </div>

                        <h3 className="text-right">Portfolio</h3>
                        <Divider orientation="vertical" />
                        <div className="flex flex-col justify-between h-auto">
                            <p>Showcase of my projects I&apos;ve done over the years.</p>
                            <Link showAnchorIcon href="/portfolio">Link</Link>
                        </div>

                        <h3 className="text-right">Resume</h3>
                        <Divider orientation="vertical" />
                        <div className="flex flex-col justify-between h-auto">
                            <p>If you&apos;re a hiring manager you should go here.</p>
                            <Link showAnchorIcon href="/resume">Link</Link>
                        </div>

                        <h3 className="text-right">Contact Me</h3>
                        <Divider orientation="vertical" />
                        <div className="flex flex-col justify-between h-auto">
                            <p>If you want to connect with me or just reach out to me directly.</p>
                            <Link showAnchorIcon href="/contact_me">Link</Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}