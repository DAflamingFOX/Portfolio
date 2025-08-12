'use client';

import KnockoutHeadingDivider from "@/components/KnockoutHeadingDivider";
import { Card, Divider, Image, Link } from '@heroui/react';

const luminaXDesc = <>
    <p>
        LuminaX is an addressable LED controller which supports both pre-defined and programatically
        controlled animation sequences. It is designed to be controlled over a CAN 2.0B / FD bus,
        and can supply 5V up to 8A continuously for LED power.
    </p>
    <p>
        LuminaX has been a pet project of mine that introduced me to the world of custom electronics
        and unfortunately gets sent to the back-burner over other for-profit projects. I do hope to finish it one day though!
    </p>
</>;

const luminaXImgs = <>
    <div className="flex flex-col justify-around">
        <Image isZoomed src='/portfolio/luminax_front.png' />
        <Image isZoomed src='/portfolio/luminax_back.png' />
    </div>
</>;

const rangerDesc = <>
    <p>
        Ranger is a Time-of-Flight sensor, with pre-configured modes to allow for the
        easist integration into existing or new designs.
    </p>
    <p>
        Ranger incorporates mixed-signal design using both digital and analog output capabilities along with
        on-board computation for a stable and reliable output.
    </p>
    <p>
        Click <Link isExternal showAnchorIcon href="https://swyftrobotics.com/products/swyft-ranger-distance-sensor">here</Link> to learn more about Ranger.
    </p>
</>;

const rangerImgs = <>
    <div className="flex flex-col justify-center">
        <Image isZoomed src="/portfolio/ranger.png" />
    </div>
</>

const cannectDesc = <>
    <p>
        CANnect is a wiring solution aimed to reduce the amount of wires and complexity when wiring a FRC robot.
    </p>
    <p>
        CANnect uses common twisted-pair category cabling to provide both power and data via 802.3af (although a CAN bus is the intended data protocol).
    </p>
    <p>
        Click <Link isExternal showAnchorIcon href="https://swyftrobotics.com/products/swyft-cannect-wiring-system">here</Link> to learn more about CANnect.
    </p>
</>;

const cannectImgs = <>
    <div className="flex flex-col justify-around items-center gap-y-4">
        <Image className="max-h-50" isZoomed src="/portfolio/cannect_direct_back.png" />
        <Image isZoomed src="/portfolio/cannect.png" />
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
        Ein was our first "command-based" robot meaning the robot operates essentially from a giant state-machine with many interconnected
        subsystems.
    </p>
    <p>
        You can view Ein's source code <Link isExternal showAnchorIcon href="https://github.com/Tigerbotics7125/FRC2022/tree/main">here.</Link>
    </p>
</>;

const einImgs = <>
    <Image isZoomed src="/portfolio/Ein_2022.jpg" />
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
        Killua is also a "command-based" robot. The robot continuously runs finely-tuned profiled PID controllers on all 3 degrees of freedom - the elevator, arm, and wrist.
        Killua is also able to automatically intake gamepieces using a current monitoring strategy.
    </p>
    <p>
        Killua's source code is available <Link isExternal showAnchorIcon href="https://github.com/Tigerbotics7125/FRC2023/tree/main">here.</Link>
    </p>
</>;

const killuaImgs = <>
    <div className="flex flex-col justify-center">
        <Image isZoomed src="/portfolio/Killua_2023.jpg" />
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
        You can play with the notebook <Link isExternal showAnchorIcon href="https://colab.research.google.com/github/DAflamingFOX/MATH-3306/blob/main/TakeHomeLab_6.ipynb">here.</Link>
    </p>
</>;

const springMassImgs = <>
    <Card isBlurred className='max-w-[500px] mt-5'>
        <video autoPlay loop muted>
            <source src='/portfolio/spring-mass-sim-cropped.mp4' type='video/mp4' />
        </video>
    </Card>
</>;

export default function Page() {


    return (
        <div className="content">
            <h1>Portfolio</h1>
            <KnockoutHeadingDivider lines={3} text="Custom electronics" />
            {/* Desktop */}
            <div className="hidden md:block">
                <div className="grid grid-cols-[1fr_auto_1fr] gap-x-4 gap-y-8 justify-around">
                    {/* Row 1 */}
                    {luminaXImgs}
                    <Divider orientation="vertical" />
                    <div className="w-full flex flex-col gap-y-2">
                        <h3>LuminaX</h3>
                        <Divider />
                        {luminaXDesc}
                    </div>
                    {/* Row 2 */}
                    <div className="w-full flex flex-col gap-y-2 text-right">
                        <h3>Ranger</h3>
                        <Divider />
                        {rangerDesc}
                    </div>
                    <Divider orientation="vertical" />
                    {rangerImgs}
                    {/* Row 3 */}
                    {cannectImgs}
                    <Divider orientation="vertical" />
                    <div className="w-full flex flex-col gap-y-2">
                        <h3>CANnect</h3>
                        <Divider />
                        {cannectDesc}
                    </div>
                </div>
            </div>
            {/* Mobile */}
            <div className="flex md:hidden flex-col gap-y-2">
                <h3>LuminaX</h3>
                <Divider />
                {luminaXImgs}
                {luminaXDesc}
                <h3>Ranger</h3>
                <Divider />
                {rangerImgs}
                {rangerDesc}
                <h3>CANnect</h3>
                <Divider />
                {cannectImgs}
                {cannectDesc}
            </div>

            <KnockoutHeadingDivider className="pt-4" text="Software & programming" />
            {/* Desktop */}
            <div className="hidden md:block">
                <div className="grid grid-cols-[1fr_auto_1fr] gap-x-4 gap-y-8">
                    {/* Row 1 */}
                    {einImgs}
                    <Divider orientation="vertical" />
                    <div className="w-full flex flex-col gap-y-2">
                        <h3>Tigerbotics FRC 2022</h3>
                        <Divider />
                        {einDesc}
                    </div>
                    {/* Row 2 */}
                    <div className="w-full flex flex-col gap-y-2 text-right">
                        <h3>Tigerbotics FRC 2023</h3>
                        <Divider />
                        {killuaDesc}
                    </div>
                    <Divider orientation="vertical" />
                    {killuaImgs}
                    {/* Row 3 */}
                    {springMassImgs}
                    <Divider orientation="vertical" />
                    <div className="w-full flex flex-col gap-y-2">
                        <h3>Spring & point-mass simulation</h3>
                        <Divider />
                        {springMassDesc}
                    </div>
                </div>
            </div>
            {/* Mobile */}
            <div className="flex md:hidden flex-col gap-y-2">
                <h3>Tigerbotics FRC 2022</h3>
                <Divider />
                {einImgs}
                {einDesc}
                <h3>Tigerbotics FRC 2023</h3>
                <Divider />
                {killuaImgs}
                {killuaDesc}
                <h3>Spring & point-mass simulation</h3>
                <Divider />
                {springMassImgs}
                {springMassDesc}
            </div>
        </div>

    )
}