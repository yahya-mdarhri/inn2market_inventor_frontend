import './SideBar.css'
import { Home, Ticket, FileText, Users, User, Settings, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@shadcn/sidebar';
import { useLocation } from 'react-router-dom';

const mainItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Tickets', url: '/tickets', icon: Ticket },
  { title: 'Patents', url: '/patents', icon: FileText },
  { title: 'CoInventors', url: '/coinventors', icon: Users },
];

const footerItems = [
  { title: 'Profile', url: '/profile', icon: User },
  { title: 'Settings', url: '/settings', icon: Settings },
  { title: 'Log out', url: '/logout', icon: LogOut },
];

function SideBar() {
  const location = useLocation();

  const isActive = (url: string) => location.pathname === url;

  return (
    <Sidebar className="sidebar-container"  collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={
                      isActive(item.url)
                        ? 'bg-[var(--secondary)] text-[var(--primary)] font-bold'
                        : ''
                    }
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon />
                      <span className='group-data-[collapsible=icon]:hidden'>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-6">
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.url)}
                className={
                  isActive(item.url)
                    ? 'bg-[var(--secondary)] text-[var(--primary)] font-bold'
                    : ''
                }
              >
                <a href={item.url} className="flex items-center gap-3">
                  <item.icon />
                  <span  className='group-data-[collapsible=icon]:hidden'>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SideBar;