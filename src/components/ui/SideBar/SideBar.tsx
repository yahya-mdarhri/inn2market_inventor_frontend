import './SideBar.css'
import { Home, Ticket, FileText, Users, User, Settings, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@shadcn/sidebar';
import { useLocation, Link } from 'react-router-dom';
import FullLogo from '@/assets/logos/full_logo.svg';
import SmallLogo from '@/assets/logos/small_logo.svg';
import { useAuth } from '@context/UserContext';

const mainItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Tickets', url: '/tickets', icon: Ticket },
  { title: 'Patents', url: '/patents', icon: FileText },
  { title: 'CoInventors', url: '/coinventors', icon: Users },
];

const footerItems = [
  { title: 'Profile', url: '/profile', icon: User },
  { title: 'Settings', url: '/settings', icon: Settings },
  { title: 'Log out', url: '', icon: LogOut },
];

function SideBar() {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (url: string) => location.pathname === url;

  return (
    <Sidebar className="sidebar-container"  collapsible="icon">
      {/* <SidebarHeader>
        <Link to="/dashboard" className="flex items-center gap-3">

          <img
            src={SmallLogo}
            alt="Logo"
            className="w-8 h-8"
          />
          <span className='group-data-[collapsible=icon]:hidden'>Inventor Platform</span>
        </Link>
      </SidebarHeader> */}

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
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon />
                      <span className='group-data-[collapsible=icon]:hidden'>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
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
                <Link to={item.url} className="flex items-center gap-3" onClick={item.title === 'Log out' ? logout : undefined}>
                  <item.icon />
                  <span  className='group-data-[collapsible=icon]:hidden'>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SideBar;