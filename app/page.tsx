'use client';

import { Divider, Link } from "@heroui/react";
import { Button } from "@heroui/react";
import { Image } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { url } from "inspector";
import { redirect, RedirectType } from "next/navigation";


export default function Page() {

    return (
        <>
            <div className="flex flex-col mx-auto my-4 px-10 max-w-6xl gap-y-4">
                {/* Image & Intro */}
                <div className="flex flex-row md:justify-center py-4 md:gap-x-8">
                    {/* Capybara Image */}
                    <Image className="hidden md:block w-sm" src="/capybara_silk_render.png" />
                    {/* Intro */}
                    <div className="flex flex-col gap-y-4 w-lg">
                        <h1 className="mt-0">Howdy</h1>
                        <p>
                            I'm Jeff Morris - a freelance electrical engineer and firmware developer, and a <Link href="https://www.firstinspires.org/" underline="always" color="foreground">FIRST Robotics</Link> alumnus.
                            I am also currently pursuing a B.S. in Electrical Engineering at Tarleton State University.
                        </p>
                        <p>
                            I specialize in microcontroller systems for robotics, focusing on prototyping and production-ready designs.
                            My goal is to create solutions which solve or simplify real-world problems, while continuously furthering my education and embracing new technologies.
                        </p>
                        <p>
                            Additionally, I am proficient in Markdown and LaTeX, which I use to produce clear technical documentation to support development and collaboration on projects.
                        </p>
                    </div>
                </div>

                <Divider />

                {/* Links */}
                <div className="flex flex-col gap-y-8 my-4">

                    {/* Blog */}
                    <Card className="flex flex-col items-center py-2 max-w-5xl w-full mx-auto hover:scale-[1.05] transition-transform duration-200 ease-in-out" isPressable onPress={() => redirect('/blog/', RedirectType.push)} shadow="md">
                        <CardBody className="flex flex-col items-center gap-y-2">
                            <h2>Visit my blog</h2>
                            <p className="text-secondary">Random technical writing ranging from math & engineering to robotics.</p>
                            <p>Click here to learn more.</p>
                        </CardBody>
                    </Card>

                    {/* Projects */}
                    <Card className="flex flex-col items-center py-2 max-w-5xl w-full mx-auto hover:scale-[1.05] transition-transform duration-200 ease-in-out" isPressable onPress={() => redirect('/projects/', RedirectType.push)} shadow="md">
                        <CardBody className="flex flex-col items-center gap-y-2">
                            <h2>See my projects</h2>
                            <p className="text-secondary">See my open portfolio of projects that I've worked on over the years.</p>
                            <p>Click here to learn more.</p>
                        </CardBody>
                    </Card>

                    {/* Contact me */}
                    <Card className="flex flex-col items-center py-2 max-w-5xl w-full mx-auto hover:scale-[1.05] transition-transform duration-200 ease-in-out" isPressable onPress={() => redirect('/contact_me/', RedirectType.push)} shadow="md">
                        <CardBody className="flex flex-col items-center gap-y-2">
                            <h2>Get in touch</h2>
                            <p className="text-secondary">View my resume, connect with me on social media, or get in touch with me!</p>
                            <p>Click here to learn more.</p>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    )
}