import { SidebarProvider } from '@shadcn/sidebar'
import Header from "@ui/Header/Header";
import Sidebar from '@ui/SideBar/SideBar';
import "./MainLayout.css";


function MainLayout({ children }: { children?: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen={false} className='bg-[var(--bg-color)]'>
          <Sidebar />
          <main className='main-container'>
            <Header />
            <div className="page-container">
              {children}
            </div>
          </main>
        </SidebarProvider>
    );
}   


export default MainLayout;