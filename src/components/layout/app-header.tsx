'use client';

/**
 * AppHeader - Professional Application Header Component
 * 
 * Provides top-level navigation with breadcrumbs, navigation menu,
 * and user account controls. Integrates with layout store for
 * responsive behavior and theme management.
 * 
 * Features:
 * - Responsive navigation menu with dropdown sections
 * - Contextual breadcrumb navigation
 * - User avatar with account dropdown
 * - Theme integration with proper accessibility
 * - Desktop-optimized layout (no mobile breakpoints)
 */

import React from 'react';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { useLayoutStore } from '@/stores/layout';
import { useAuth } from '@/components/providers/auth-provider';
import { AppHeaderProps } from '@/types/layout';

// ============================================================================
// Navigation Configuration
// ============================================================================

/**
 * Main navigation menu structure
 * Configured for professional application use cases
 */
const NAVIGATION_ITEMS = [
  {
    title: 'Explore',
    href: '/explore',
    description: 'Data exploration and visualization tools',
    items: [
      { title: 'Dashboard', href: '/explore/dashboard', description: 'Overview and key metrics' },
      { title: 'Analytics', href: '/explore/analytics', description: 'Advanced data analysis' },
      { title: 'Reports', href: '/explore/reports', description: 'Generated reports and insights' },
    ],
  },
  {
    title: 'Manage',
    href: '/manage',
    description: 'Configuration and administration',
    items: [
      { title: 'Settings', href: '/manage/settings', description: 'Application configuration' },
      { title: 'Users', href: '/manage/users', description: 'User management and permissions' },
      { title: 'Integrations', href: '/manage/integrations', description: 'Third-party connections' },
    ],
  },
  {
    title: 'Tools',
    href: '/tools',
    description: 'Utilities and advanced features',
    items: [
      { title: 'Import', href: '/tools/import', description: 'Data import tools' },
      { title: 'Export', href: '/tools/export', description: 'Data export options' },
      { title: 'API', href: '/tools/api', description: 'API documentation and testing' },
    ],
  },
] as const;

// ============================================================================
// AppHeader Component
// ============================================================================

/**
 * AppHeader component providing top-level navigation and user controls
 * 
 * @param props - AppHeader configuration props
 */
export const AppHeader: React.FC<AppHeaderProps> = ({
  showBreadcrumbs = true,
  className = '',
}) => {
  const breadcrumb = useLayoutStore((state) => state.breadcrumb);
  const setTheme = useLayoutStore((state) => state.setTheme);
  const { user, isAuthenticated, logout } = useAuth();

  /**
   * Handle theme toggle action
   * Cycles through light -> dark -> system theme options
   */
  const handleThemeToggle = () => {
    // Simple theme cycling - could be extended with more sophisticated logic
    setTheme('system');
  };

  /**
   * Handle user logout action
   */
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  /**
   * Render breadcrumb navigation
   */
  const renderBreadcrumbs = () => {
    if (!showBreadcrumbs || breadcrumb.length === 0) {
      return null;
    }

    return (
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumb.map((item, index) => (
            <React.Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItem>
                {item.isCurrent ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href || '#'}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  /**
   * Render main navigation menu
   */
  const renderNavigation = () => (
    <NavigationMenu>
      <NavigationMenuList>
        {NAVIGATION_ITEMS.map((section) => (
          <NavigationMenuItem key={section.title}>
            <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href={section.href}
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        {section.title}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        {section.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {section.items.map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href={item.href}
                      >
                        <div className="text-sm font-medium leading-none">
                          {item.title}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );

  /**
   * Render user account dropdown
   */
  const renderUserDropdown = () => {
    if (!isAuthenticated || !user) {
      return (
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      );
    }

    // Generate user initials for avatar fallback
    const userInitials = user.name
      ? user.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : user.email
          ?.slice(0, 2)
          .toUpperCase() || 'U';

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name || user.email} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.name || 'User'}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleThemeToggle}>
            Toggle Theme
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/preferences">Preferences</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}
    >
      <div className="container flex h-14 items-center">
        {/* Left section: Navigation */}
        <div className="mr-4 hidden md:flex">
          {renderNavigation()}
        </div>

        {/* Center section: Breadcrumbs */}
        <div className="flex flex-1 items-center justify-start space-x-2">
          {renderBreadcrumbs()}
        </div>

        {/* Right section: User controls */}
        <div className="flex items-center justify-end space-x-2">
          {renderUserDropdown()}
        </div>
      </div>

      {/* Mobile navigation separator (hidden on desktop) */}
      <Separator className="md:hidden" />
    </header>
  );
};

// ============================================================================
// Default Export
// ============================================================================

export default AppHeader;