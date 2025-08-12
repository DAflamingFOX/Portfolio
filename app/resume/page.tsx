'use client';

import { ResumeList } from "@/app/resume/ResumeList";
import KnockoutHeadingDivider from "@/components/KnockoutHeadingDivider";
import { Link } from "@heroui/react";

export default function Page() {

    return (
        <div className="content">
            <h1>Resumes</h1>
            <KnockoutHeadingDivider lines={3} text="Check me out" />
            <ResumeList />
            <KnockoutHeadingDivider lines={0} text="References" className="my-2"/>
            <div className="font-medium">
                <p>{`For the sake of my referrer's privacy, reference letters are only available upon request.`}</p>
                <p>Feel free to <Link href="/contact_me">contact me</Link> if you would like a copy.</p>
            </div>
        </div>
    );
}