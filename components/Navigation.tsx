'use client';

import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react";
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeChanger } from './ThemeChanger';

export function Navigation() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Resume', href: '/resume' },
        { name: 'Contact Me', href: '/contact_me' }
    ];

    const pathname = usePathname();

    return (
        <Navbar shouldHideOnScroll isBlurred onMenuOpenChange={setIsMenuOpen}>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarMenu>
                {
                    navItems.map((item) => {
                        const isCurrent = pathname === item.href;
                        return (
                            <NavbarMenuItem key={item.name}>
                                <Link href={item.href} color={isCurrent ? 'primary' : 'foreground'}>
                                    {item.name}
                                </Link>
                            </NavbarMenuItem>
                        );
                    })
                }
            </NavbarMenu>
            <NavbarBrand>
                <Link href="/" color="foreground">
                    <h6 className="font-bold text-inherit">Jeffrey Morris</h6>
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4 font-medium" justify="center">
                {
                    navItems.map((item) => {
                        const isCurrent = pathname === item.href;
                        return (
                            <NavbarItem key={item.name} aria-current={isCurrent}>
                                <h6>
                                    <Link href={item.href} color={isCurrent ? 'primary' : "foreground"}>
                                        {item.name}
                                    </Link>
                                </h6>
                            </NavbarItem>
                        );
                    })
                }
            </NavbarContent>
            <NavbarContent justify='end'>
                <ThemeChanger />
            </NavbarContent>
        </Navbar>
    );
}
