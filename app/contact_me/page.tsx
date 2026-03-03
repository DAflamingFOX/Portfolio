import { Metadata } from 'next';
import Contact from './ContactMe';

export const metadata: Metadata = {
    title: "Contact Me",
    description: "Get in touch with Jeff.",
    openGraph: {
        title: "Contact Me",
        description: "Get in touch with Jeff.",
    }
}



export default function Page() {
    return (
        <Contact />
    );
}