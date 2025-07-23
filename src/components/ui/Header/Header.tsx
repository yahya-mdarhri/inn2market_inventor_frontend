import React, { useEffect, useState } from 'react';
import { SidebarTrigger } from '@shadcn/sidebar'
import { Button } from "@shadcn/button";
import { Avatar, AvatarImage, AvatarFallback } from "@shadcn/avatar";
import { MdAdd, MdNotifications, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { Notification } from '@/types/notifecation';
import { Skeleton } from '@/components/shadcn/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/context/UserContext';


async function fetchNotifications(page = 1, pageSize = 3): Promise<{ count: number, results: Notification[] }> {
  const response = await axios.get('/api/accounts/notifications/', {
    params: { page, page_size: pageSize },
    headers: { 'accept': 'application/json' },
  });
  return response.data;
}

async function makeAllRead(): Promise<void> {
  await axios.put('/api/accounts/notifications/', null, {
    headers: { 'accept': 'application/json' },
  });
}

async function markNotificationRead(id: string): Promise<void> {
  await axios.put(`/api/accounts/notifications/${id}/`, null, {
    headers: { 'accept': 'application/json' },
  });
}

function Header() {
  const navigator = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(3); // or make this adjustable
  const [totalCount, setTotalCount] = useState(0);
  const { user } = useAuth();
  const handleNotificationsClick = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      setPage(1); // reset to first page
    }
  };

  const fetchAndSetNotifications = async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchNotifications(page, pageSize);
      setNotifications(data.results);
      setTotalCount(data.count);
    } catch (e) {
      // handle error
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchInitialNotifications = async () => {
      setLoading(true);
      try {
        const data = await fetchNotifications();
        setNotifications(data.results);
        setTotalCount(data.count);
      } catch (e) {
        console.error('Failed to fetch notifications:', e);
      }
      setLoading(false);
    };

    fetchInitialNotifications();
  }, [])

  useEffect(() => {
    if (showDropdown) {
      fetchAndSetNotifications(page);
    }
  }, [page, showDropdown]);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <header className="header-container">
      <SidebarTrigger className='header-button box'/>
      <div className="left-actions">
        <Button className='header-button' onClick={ () => navigator('/tickets/create') }>
          <MdAdd  />
          create
        </Button>
        <div className="relative">
          <Button className="header-button box" onClick={handleNotificationsClick}>
            <MdNotifications />
          </Button>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 border border-[var(--primary)] bg-[#D1D600] text-[#073567] rounded-full px-1.5 text-xs font-bold z-10">
              {unreadCount}
            </span>
          )}
          {showDropdown && (
            <div className="absolute right-0 top-10 bg-[#b7c7d8] border border-gray-200 rounded-lg shadow-lg min-w-[300px] max-w-[350px] max-h-[400px] flex flex-col z-20">
              <div className="flex items-center justify-between px-4 py-3 border-b font-semibold text-base text-[#073567]">
                Notifications
                <button
                  className="text-[#073567] text-sm font-medium hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                  onClick={async () => {
                    await makeAllRead();
                    setNotifications(notifications.map(n => ({ ...n, is_read: true })));
                  }}
                  disabled={notifications.every(n => n.is_read)}
                >
                  Mark all as read
                </button>
              </div>
              <div className="overflow-y-auto max-h-[340px] flex flex-col">
                {loading ? (
                  [1,2,3].map((_, idx) => (
                    <div className="px-4 py-3 border-b last:border-b-0 flex flex-col gap-1" key={idx}>
                      <Skeleton className="h-4 w-3/4 mb-2 bg-[#e6ecf3]" />
                      <Skeleton className="h-3 w-1/3 bg-[#e6ecf3]" />
                    </div>
                  ))
                ) : notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-[#073567] py-8 gap-2 opacity-60">
                    <MdNotifications size={32} className="opacity-30" />
                    <div>No notifications</div>
                  </div>
                ) : (
                  <>
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        className={`px-4 py-3 border-b last:border-b-0 flex flex-col gap-1 cursor-pointer focus:outline-none rounded transition-colors ${
                          n.is_read
                            ? 'bg-white text-[#073567]'
                            : 'bg-[#e6ecf3] font-semibold text-[#073567] hover:bg-[#D1D600] hover:text-[#073567]'
                        }`}
                        tabIndex={0}
                        role="button"
                        onClick={async () => {
                          if (!n.is_read) {
                            await markNotificationRead(n.id);
                            setNotifications(notifications =>
                              notifications.map(item =>
                                item.id === n.id ? { ...item, is_read: true } : item
                              )
                            );
                          }
                        }}
                      >
                        <div className="text-sm">{n.message}</div>
                        <div className="text-xs text-[#073567] opacity-70">{formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}</div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-4 py-2 border-t">
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="text-sm px-2 py-1 flex items-center justify-center"
                      >
                        <MdChevronLeft size={20} />
                      </button>
                      <span className="text-xs">
                        Page {page} of {Math.ceil(totalCount / pageSize)}
                      </span>
                      <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={page * pageSize >= totalCount}
                        className="text-sm px-2 py-1 flex items-center justify-center"
                      >
                        <MdChevronRight size={20} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <Avatar className='header-avatar box' onClick={() => navigator('/profile')}>
          <AvatarImage src={user?.inventor?.image} />
          <AvatarFallback>{(user?.inventor?.preferred_name || 'CN').slice(0,2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default Header;