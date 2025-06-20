import { SidebarProvider, SidebarTrigger } from '@shadcn/sidebar'
import Sidebar from '@ui/SideBar/SideBar';
import "./MainLayout.css";


function MainLayout({ children }: { children?: React.ReactNode }) {
    return (
        <SidebarProvider>
          <Sidebar />
          <main className='main-container'>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
    );
}   


export default MainLayout;