'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  Button,
  ScrollArea,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
} from '../index';
import { cn } from '../utils/cn';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Notification {
  id: string;
  title: string;
  timestamp: string;
}

interface User {
  name: string;
  email: string;
  image?: string;
  fallback?: string;
}

export interface DashboardLayoutProps {
  /**
   * The main content of the dashboard
   */
  children: React.ReactNode;
  /**
   * The navigation items to show in the sidebar
   */
  navItems: NavItem[];
  /**
   * The brand name to show in the header
   */
  brand: {
    name: string;
    logo: React.ComponentType<{ className?: string }>;
  };
  /**
   * The current user
   */
  user: User;
  /**
   * The notifications to show in the header
   */
  notifications?: Notification[];
  /**
   * The current path to highlight the active nav item
   */
  currentPath: string;
  /**
   * Callback when a notification is clicked
   */
  onNotificationClick?: (notification: Notification) => void;
  /**
   * Callback when the profile menu item is clicked
   */
  onProfileClick?: () => void;
  /**
   * Callback when the settings menu item is clicked
   */
  onSettingsClick?: () => void;
  /**
   * Callback when the logout menu item is clicked
   */
  onLogout?: () => void;
  /**
   * Additional class names for the layout container
   */
  className?: string;
}

export function DashboardLayout({
  children,
  navItems,
  brand,
  user,
  notifications = [],
  currentPath,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onLogout,
  className,
}: DashboardLayoutProps) {
  const Logo = brand.logo;

  return (
    <div className={cn('flex flex-col h-screen', className)}>
      <header className="border-b z-10">
        <div className="flex h-16 items-center px-4 gap-4 justify-end">
          {notifications.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <BellIcon className="h-5 w-5" />
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 justify-center"
                    variant="destructive"
                  >
                    {notifications.length}
                  </Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    onClick={() => onNotificationClick?.(notification)}
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 h-8">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.fallback}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden sm:inline-block">
                    {user.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onProfileClick}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onSettingsClick}>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <Link href="/" className="flex items-center gap-2 px-4 py-4">
                <Logo className="h-6 w-6" />
                <span className="text-lg font-semibold">{brand.name}</span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <ScrollArea className="flex-1 px-3">
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={
                          currentPath === item.href ? 'secondary' : 'ghost'
                        }
                        className="w-full justify-start gap-2"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Button>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </SidebarContent>
            <SidebarFooter>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={onLogout}
              >
                <LogOutIcon className="h-4 w-4" />
                Logout
              </Button>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1">
            <main className="flex-1 overflow-y-auto p-8">{children}</main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}

// Icons
function BellIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function LogOutIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function SettingsIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UserIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
