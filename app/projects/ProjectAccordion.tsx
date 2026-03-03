'use client';

import { Card, Image, Link, Accordion, AccordionItem } from '@heroui/react';

const luminaXDesc = <>
    <p>LuminaX is an addressable LED controller supporting pre-defined and custom animations.</p>
    <p>It interfaces via either a CAN bus or USB, and is designed to be used on FIRST® Robotics Competition robots.</p>
    <p>It supports 5V at up to 8A on it&apos;s output and has two LED channels, meaning it can control about as many LEDs as your heart desires.</p>
    <p>Unfortunately, LuminaX is unfinished, and is just a passion project of mine, I hope to finish it eventually though.</p>
</>;

const luminaXImgs = <>
    <div className="flex flex-col justify-around">
        <Image src='/portfolio/luminax_front.png' alt='luminax front' />
        <Image src='/portfolio/luminax_back.png' alt='luminax back' />
    </div>
</>;

const rangerDesc = <>
    <p>Ranger is a <Link href="https://en.wikipedia.org/wiki/Time_of_flight" isExternal>Time-of-Flight</Link> sensor kit, designed with pre-configured operation modes in order to provide the easiest integration experience possible.</p>
    <p>Ranger is tiny, (16 x 20mm), and packs a dense mixed-signal design, incorporating both digital and analog outputs.</p>
    <p>Ranger is manufactured thanks to a collaboration with SWYFT Robotics, you can view the product page <Link href="https://swyftrobotics.com/products/swyft-ranger-distance-sensor" isExternal>here</Link> and view the technical documentation <Link href="https://docs.swyftrobotics.com/electronics/swyft-ranger/" isExternal>here.</Link></p>
</>;

const rangerImgs = <>
    <div className="flex flex-col justify-center">
        <Image src="/portfolio/ranger.png" alt='ranger' />
    </div>
</>

const cannectDesc = <>
    <p>CANnect is a wiring solution aimed to reduce the number of required connections and complexity when wiring a FIRST® Robotics Competition robot.</p>
    <p>It uses common ethernet / category cabling to provide both power and data.</p>
    <p>Using multiple modules daisy-chained together allows teams to branch off power and data connections as they see fit, as opposed to many different individual wire runs.</p>
    <p>CANnect is manufactured thanks to a collaboration with SWYFT Robotics, you can view the product page <Link isExternal href="https://swyftrobotics.com/products/swyft-cannect-wiring-system">here</Link> and the technical documentation <Link href="https://docs.swyftrobotics.com/electronics/swyft-cannect/" isExternal>here.</Link></p>
    <p>Thanks to FRC team 2412 Robototes for the images of CANnect being used on one of their bots.</p>
</>;

const cannectImgs = <>
    <div className="flex flex-col justify-around items-center gap-y-4">
        <Image src="/portfolio/CANnectV2.png" alt="CANnect V2" />
        <Image src="/portfolio/CANnect_in_use.jpeg" alt="CANnect V1 in use" />
        <Image src="/portfolio/CANnect_in_use_arm.jpeg" alt="CANnect V1 in use on robot arm" />
        {/* <Image className="max-h-50" src="/portfolio/cannect_direct_back.png" alt='cannect back' /> */}
        {/* <Image src="/portfolio/cannect.png" alt='cannect group' /> */}
    </div>
</>;

const einDesc = <>
    <p>
        Our robot, Ein, was designed for the FIRST Robotics Competition - Rapid React.
    </p>
    <p>
        Ein made it all the way to the FIRST in Texas District Championship - which is the farthest the team has ever gone to-date.
    </p>
    <p>
        {`Ein was our first "command-based" robot meaning the robot operates essentially from a giant state-machine with many interconnected
        subsystems.`}
    </p>
    <p>
        {`You can view Ein's source code `}<Link isExternal href="https://github.com/Tigerbotics7125/FRC2022/tree/main">here.</Link>
    </p>
</>;

const einImgs = <>
    <Image src="/portfolio/Ein_2022.jpg" alt='Ein' />
</>;

const killuaDesc = <>
    <p>
        Our robot, Killua, was designed for the FIRST Robotics Competition - Charged Up.
    </p>
    <p>
        Killua competed in 2 FIRST in Texas district level events, and then again at the Texas Robotics Invitational summer offseason event.
    </p>
    <p>
        Killua was likely our most advanced robot to-date and such has large amounts of routines and automations to control the actions of it.
    </p>
    <p>
        {`Killua is also a "command-based" robot. The robot continuously runs finely-tuned profiled PID controllers on all 3 degrees of freedom - the elevator, arm, and wrist.
        Killua is also able to automatically intake gamepieces using a current monitoring strategy.`}
    </p>
    <p>
        {`Killua's source code is available `}<Link isExternal href="https://github.com/Tigerbotics7125/FRC2023/tree/main">here.</Link>
    </p>
</>;

const killuaImgs = <>
    <div className="flex flex-col justify-center">
        <Image src="/portfolio/Killua_2023.jpg" alt='Killua' />
    </div>
</>;

const springMassDesc = <>
    <p>
        A take-home lab from my differential equations class.
    </p>
    <p>
        The goal was to find physics constants (point-mass, drag coefficient, gravity, spring constant, natural length, etc.)
        to produce a stable pyramid built with 3 point-masses all interconnected with springs.
    </p>
    <p>
        The simulation I designed is actually able to run on any arbitrarily defined point-masses and spring connections.
    </p>
    <p>
        You can play with the notebook <Link isExternal href="https://colab.research.google.com/github/DAflamingFOX/MATH-3306/blob/main/TakeHomeLab_6.ipynb">here.</Link>
    </p>
</>;

const springMassImgs = <>
    <Card isBlurred className='max-w-[500px] mt-5'>
        <video autoPlay loop muted>
            <source src='/portfolio/spring-mass-sim-cropped.mp4' type='video/mp4' />
        </video>
    </Card>
</>;


export default function ProjectAccordion() {
    return (
        <Accordion selectionMode="multiple" variant="light" defaultExpandedKeys={"1"}>
            <AccordionItem key="1" title="LuminaX" subtitle="A CAN based addressable LED controller.">
                <div className="flex flex-col gap-y-2">
                    {luminaXDesc}
                    {luminaXImgs}
                </div>
            </AccordionItem>
            <AccordionItem key="2" title="Ranger" subtitle="A simplified ToF sensor kit.">
                <div className="flex flex-col gap-y-2">
                    {rangerDesc}
                    {rangerImgs}
                </div>
            </AccordionItem>
            <AccordionItem key="3" title="CANnect" subtitle="A CAN & power wiring solution using ethernet cables.">
                <div className="flex flex-col gap-y-2">
                    {cannectDesc}
                    {cannectImgs}
                </div>
            </AccordionItem>
            <AccordionItem key="4" title="Tigerbotics" subtitle="Alumni & mentor of FIRST® Robotics Competition team, 7125 - Tigerbotics.">
                <div className="flex flex-col gap-y-2">
                    {einDesc}
                    {einImgs}
                    {killuaDesc}
                    {killuaImgs}
                </div>
            </AccordionItem>
            <AccordionItem key="5" title="Applied DE Simulation" subtitle="Simulating spring-mass DE systems in a jupyter notebook.">
                <div className="flex flex-col gap-y-2">
                    {springMassDesc}
                    {springMassImgs}
                </div>
            </AccordionItem>
        </Accordion>
    )
}