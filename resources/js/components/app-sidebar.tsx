import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, Home, Search, Wrench } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Home',
        href: '/',
        icon: Home,
    },
    {
        title: 'Browse Tools',
        href: '/tools',
        icon: Search,
    },
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Folder,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Manage Tools',
        href: '/admin/tools',
        icon: Wrench,
    },
    {
        title: 'Categories',
        href: '/admin/categories',
        icon: Folder,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { props } = usePage();
    const user = (props as { auth?: { user?: { role?: string } } }).auth?.user;
    const isAdmin = user?.role === 'admin';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} label="Navigation" />
                {isAdmin && (
                    <NavMain items={adminNavItems} label="Administration" />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
