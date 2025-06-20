import { SidebarProvider } from '@shadcn/sidebar'
import Header from "@ui/Header/Header";
import Sidebar from '@ui/SideBar/SideBar';
import "./MainLayout.css";


function MainLayout({ children }: { children?: React.ReactNode }) {
    return (
        <SidebarProvider>
          <Sidebar />
          <main className='main-container'>
            <Header />
            {children}
          </main>
        </SidebarProvider>
    );
}   


export default MainLayout;