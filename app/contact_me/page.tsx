'use client';

import { ContactForm } from "@/components/ContactForm";
import { Divider, Link } from "@heroui/react";
import KnockoutHeadingDivider from "@/components/KnockoutHeadingDivider";

export default function Page() {
    return (
        <>
            <div className="content">
                <h1>Contact Me</h1>
                <KnockoutHeadingDivider lines={3} text="Let's chat" />
                <div className=" my-4 flex flex-col lg:flex-row justify-between gap-y-4">
                    <div className={`mr-4`}>
                        <p>{`I'm always looking for new opportunties to grow and flex my skills.`}</p>
                        <br />
                        <p>{`Fill out the form to reach out to me and let's see what we can cook up!`}</p>
                    </div>
                    <ContactForm className='flex-grow' />
                </div>
                <KnockoutHeadingDivider text="Connect with me" />
                <div className="my-4 grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-6">

                    <h3 className="text-right">Email</h3>
                    <Divider orientation="vertical" />
                    <div className="flex flex-col justify-between h-15">
                        <p>Jeff@Jeffrey-m.com</p>
                        <Link isExternal showAnchorIcon href="mailto:jeff@jeffrey-m.com">Link</Link>
                    </div>

                    <h3 className="text-right">LinkedIn</h3>
                    <Divider orientation="vertical" />
                    <div className="flex flex-col justify-between h-15">
                        <p>Jeffrey Morris</p>
                        <Link isExternal showAnchorIcon href="www.linkedin.com/in/jeffrey-morris-60729a309">Link</Link>
                    </div>

                    <h3 className="text-right">GitHub</h3>
                    <Divider orientation="vertical" />
                    <div className="flex flex-col justify-between h-15">
                        <p>@DAflamingFOX</p>
                        <Link isExternal showAnchorIcon href="https://github.com/daflamingfox">Link</Link>
                    </div>

                    <h3 className="text-right">Discord</h3>
                    <Divider orientation="vertical" />
                    <div className="flex flex-col justify-between h-15">
                        <p>@DAflamingFOX</p>
                        {/* Unfortunately discord doesn't have a way to take you directly to friend requests. */}
                        <Link isExternal showAnchorIcon href="https://discord.com/channels/@me">Link</Link>
                    </div>
                </div>
            </div>

        </>
    );
}