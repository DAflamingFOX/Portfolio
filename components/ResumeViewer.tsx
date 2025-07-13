'use client';

import { Accordion, AccordionItem } from '@heroui/react';

export function ResumeViewer() {
    const resumeList = [
        '/resume/Resume_7-11-25.pdf',
        '/resume/Resume_1-4-24.pdf'
    ];

    return (
        <>
            <Accordion variant="splitted" defaultExpandedKeys={['0']}>
                {resumeList.map((url, index) => {

                    const match = url.match(/Resume_(.+)\.pdf$/);
                    const date = match?.[1] ?? 'Unknown Date';

                    return (
                        <AccordionItem
                            key={`${index}`}
                            title={`Résumé ${date}${index === 0 ? ' (most recent)' : ''}`}
                            subtitle={
                                <a download href={url} className="text-blue-500 underline">
                                    Download
                                </a>
                            }
                        >
                            <embed src={url} type="application/pdf" width="100%" height="600px" />
                        </AccordionItem>

                    )
                })}
            </Accordion>
        </>
    );
}