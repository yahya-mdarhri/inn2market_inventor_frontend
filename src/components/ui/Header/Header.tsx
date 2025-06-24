import { SidebarTrigger } from '@shadcn/sidebar'
import { Button } from "@shadcn/button";
import { Avatar, AvatarImage, AvatarFallback } from "@shadcn/avatar";
import { MdAdd, MdNotifications } from 'react-icons/md';
import './Header.css';

function Header() {
  return (
    <header className="header-container">
      <SidebarTrigger className='header-button box'/>
      <div className="left-actions">
        <Button className='header-button'>
          <MdAdd  />
          create
        </Button>
        <Button className='header-button box'>
          <MdNotifications />
        </Button>
        <Avatar className='header-avatar box'>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default Header;