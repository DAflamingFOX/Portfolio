import ProjectAccordion from './ProjectAccordion';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Projects",
    description: "Jeff's projects and research.",
    openGraph: {
        title: "Jeff's Projects",
        description: "Jeff's projects and research.",
        images: [
            {
                url: '/portfolio/ranger.png',
            }
        ],
    }
}


export default function Page() {

    return (
        <>
            <div className="flex flex-col mx-auto px-8 max-w-5xl gap-y-8">
                <div className="flex flex-col gap-y-4 mt-4">
                    <h1>Projects</h1>
                    <p className="text-foreground-500">A brief overview of my work.</p>
                </div>
                <ProjectAccordion/>
            </div>
        </>
    )
}