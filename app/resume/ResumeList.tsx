'use client';

import { Accordion, AccordionItem, Link } from '@heroui/react';

type Resume = {
    path: string,
    title: string,
};

const resumePath = '/resume';

export function ResumeList() {

    const resumeList: Resume[] = [
        { path: `${resumePath}/Resume_7-11-25.pdf`, title: 'Generic Resume 7-11-25' },
        { path: `${resumePath}/Resume_1-4-24.pdf`, title: 'Generic Resume 1-4-24' }
    ]

    return (
        <Accordion variant='bordered'  keepContentMounted fullWidth>
            {
                resumeList.map((resume, index) => {
                    return (
                        <AccordionItem key={index}
                            title={
                                <div className='flex justify-between'>
                                    <p>{resume.title}</p>
                                    <Link href={resume.path}>Download</Link>
                                </div>
                            }>
                            <embed src={resume.path} width="100%" height="600px" />
                        </AccordionItem>
                    );

                })
            }
        </Accordion>

        // <>
        //     <Accordion variant="splitted" defaultExpandedKeys={['0']}>
        //         {resumeList.map((url, index) => {

        //             const match = url.match(/Resume_(.+)\.pdf$/);
        //             const date = match?.[1] ?? 'Unknown Date';

        //             return (
        //                 <AccordionItem
        //                     key={`${index}`}
        //                     title={`Résumé ${date}${index === 0 ? ' (most recent)' : ''}`}
        //                     subtitle={
        //                         <a download href={url} className="text-blue-500 underline">
        //                             Download
        //                         </a>
        //                     }
        //                 >
        //                     <embed src={url} type="application/pdf" width="100%" height="600px" />
        //                 </AccordionItem>

        //             )
        //         })}
        //     </Accordion>
        // </>
    );
}