'use client';

import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react";
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Navigation() {

    const leftNav = [
        { name: 'Blog', href: '/blog' },
        { name: 'Projects', href: '/projects' },
    ];

    const rightNav = [
        { name: 'Contact', href: '/contact_me' }
    ]

    const navItems = [{ name: "Home", href: '/' }].concat(leftNav).concat(rightNav);

    const pathname = usePathname();

    return (
        <Navbar isBordered isBlurred={false} height={'2rem'} maxWidth="full" className="flex">
            <NavbarBrand className="grow-0">
                <Link href="/" color="foreground" className="font-bold text-lg">
                    Jeffrey Morris
                </Link>
            </NavbarBrand>

            <NavbarContent justify="start" className="max-sm:hidden">
                {
                    leftNav.map((item) => {
                        const isCurrent = pathname === item.href;
                        return (
                            <NavbarItem key={item.name} aria-current={isCurrent}>
                                <Link href={item.href} color={isCurrent ? "primary" : "foreground"} >{item.name}</Link>
                            </NavbarItem>
                        );
                    })
                }
            </NavbarContent>

            <NavbarContent justify="end" className="max-sm:hidden">
                {
                    rightNav.map((item) => {
                        const isCurrent = pathname === item.href;
                        return (
                            <NavbarItem key={item.name} aria-current={isCurrent}>
                                <Link href={item.href} color={isCurrent ? "primary" : "foreground"} >{item.name}</Link>
                            </NavbarItem>
                        )
                    })
                }
            </NavbarContent>

            <div className="flex justify-end grow sm:grow-0">
                <ThemeSwitcher />
            </div>

            <NavbarMenuToggle className="sm:hidden" />

            <NavbarMenu >
                {
                    navItems.map((item) => {
                        const isCurrent = pathname === item.href;
                        return (
                            <NavbarMenuItem key={item.name}>
                                <Link href={item.href} color={isCurrent ? 'primary' : 'foreground'}>{item.name}</Link>
                            </NavbarMenuItem>
                        );
                    })
                }
            </NavbarMenu>
        </Navbar>
    );
}
