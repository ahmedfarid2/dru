'use client';

import { usePathname } from 'next/navigation';
import { DashboardLayout } from '@dru/web-ui';
import { LayoutDashboard, Users, Package } from 'lucide-react';

const navItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    href: '/admin/dashboard/users',
    icon: Users,
  },
  {
    title: 'Products',
    href: '/admin/dashboard/products',
    icon: Package,
  },
];

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <DashboardLayout
      navItems={navItems}
      currentPath={pathname}
      brand={{
        name: 'Dru',
        logo: Package,
      }}
      user={{
        name: 'John Doe',
        email: 'john@example.com',
        fallback: 'JD',
      }}
      notifications={[
        {
          id: '1',
          title: 'New user registered',
          timestamp: '2 minutes ago',
        },
        {
          id: '2',
          title: 'New order received',
          timestamp: '1 hour ago',
        },
        {
          id: '3',
          title: 'Server update completed',
          timestamp: '3 hours ago',
        },
      ]}
      onLogout={() => {
        // TODO: Implement logout logic
        window.location.href = '/admin/auth/login';
      }}
    >
      {children}
    </DashboardLayout>
  );
}
