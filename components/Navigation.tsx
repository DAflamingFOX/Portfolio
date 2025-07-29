'use client';

import { usePathname } from 'next/navigation';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import { ThemeChanger } from './ThemeChanger';

export function Navigation() {

    const navItems = [
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Resume', href: '/resume' },
        { name: 'Contact Me', href: '/contact_me' }
    ];

    const pathname = usePathname();

    return (
        <Navbar shouldHideOnScroll isBlurred>
            <NavbarBrand>
                <Link href="/" color="foreground">
                    <p className="font-bold text-inherit">Jeffrey Morris</p>
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {
                    navItems.map((item) => {
                        const isCurrent = pathname === item.href;

                        return (
                            <NavbarItem key={item.name} aria-current={isCurrent}>
                                <Link href={item.href} color={isCurrent ? "primary" : "foreground"}>
                                    {item.name}
                                </Link>
                            </NavbarItem>
                        );
                    })
                }
            </NavbarContent>
            <NavbarContent justify='end'>
                <ThemeChanger/>
            </NavbarContent>
        </Navbar>
    );
}
