import "./Dashboard.css";
import { Card, CardContent } from '@shadcn/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@shadcn/table';
import { Clock, FileText, Users, Ticket } from 'lucide-react';
import { Button } from '@shadcn/button';
import { MdAdd } from 'react-icons/md';
import heroImage from './images/welcome-image.png';
import { Avatar, AvatarImage, AvatarFallback } from '@shadcn/avatar';
import { MdAddCircle, MdEdit, MdPersonAdd, MdCheckCircle } from "react-icons/md";
import { useAuth } from "@context/UserContext";
import { Helmet } from '@dr.pogodin/react-helmet';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Skeleton } from "@/components/shadcn/skeleton";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom"

type Inventor = {
  name: string;
  img: string;
};

type Ticket = {
  id: number;
  title: string;
  status: string;
  inventors: Inventor[];
};

type Activity = {
  id: number;
  action: string;
  activity_type: string;
  created_at: string;
};

const activityTypeIcon: Record<string, React.ElementType> = {
  create: MdAddCircle,
  update: MdEdit,
  add: MdPersonAdd,
  approve: MdCheckCircle,
  // fallback/default
  default: MdEdit,
};

const stats = [
  { label: 'Patents', value: 12, icon: FileText },
  { label: 'Tickets', value: 34, icon: Ticket },
  { label: 'Co-Inventors', value: 5, icon: Users },
];

const Dashboard = () => {

  const {user} = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  useEffect(() => {
    async function fetchTicketsAndInventors() {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/inventors/tickets/");
        const ticketResults = data.results || [];
        const ticketsWithInventors: Ticket[] = await Promise.all(
          ticketResults.map(async (ticket: any) => {
            const inventors: Inventor[] = await Promise.all(
              (ticket.inventors || []).map(async (invId: string) => {
                try {
                  const { data: inventor } = await axios.get(`/api/inventors/inventor/${invId}`);
                  return {
                    name: inventor.preferred_name || inventor.full_name || invId,
                    img: inventor.avatar || "/avatars/default.png",
                  };
                } catch {
                  return { name: invId, img: "/avatars/default.png" };
                }
              })
            );
            return {
              id: ticket.id,
              title: ticket.title,
              status: ticket.status,
              inventors,
            };
          })
        );
        setTickets(ticketsWithInventors);
      } catch (err) {
        setTickets([]);
      }
      setLoading(false);
    }
    fetchTicketsAndInventors();
  }, []);

  useEffect(() => {
    async function fetchActivities() {
      setLoadingActivities(true);
      try {
        const { data } = await axios.get("/api/accounts/activity-logs/");
        setActivities(data.results || []);
      } catch (err) {
        setActivities([]);
      }
      setLoadingActivities(false);
    }
    fetchActivities();
  }, []);
  return (
    <>
    <Helmet>
      <title>Dashboard | Inventor Portal</title>
      <meta property="og:title" content="Dashboard | Inventor Portal" />
      <meta name="description" content="View your inventor dashboard, recent activities, and manage your patent tickets." />
      <meta property="og:description" content="View your inventor dashboard, recent activities, and manage your patent tickets." />
    </Helmet>
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto justify-center gap-6 lg:gap-12">
      {/* Welcome card */}
      <Card className="flex items-center bg-[#073567] rounded-2xl px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-10 w-full lg:w-2/3 max-h-none lg:max-h-[305px] shadow-lg">
        <CardContent className="flex flex-col justify-center flex-1 p-0 text-center sm:text-left">
          <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
            Welcome back, <span className="text-[#D1D600]">{user?.inventor?.preferred_name}</span>
          </h2>
          <p className="text-white text-sm sm:text-base lg:text-lg font-semibold mb-1">
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Maecenas vehicula.
          </p>
          <Button className="bg-[#D1D600] text-[#073567] font-bold text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 rounded-lg flex items-center gap-1 sm:gap-2 shadow-none hover:bg-[#bdbd00] w-full sm:w-auto justify-center">
            <Link to="/tickets/create" className="flex items-center gap-1 sm:gap-2 text-[#073567] no-underline">Submit Your Patent <MdAdd size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" /></Link>
          </Button>
        </CardContent>
        <div className="flex-1 flex justify-center sm:justify-end mt-0 sm:w-2/3">
          <img
            src={heroImage}
            alt="Welcome"
            className="max-h-28 sm:max-h-40 lg:max-h-48 xl:max-h-56 w-auto rounded-xl"
          />
        </div>
      </Card>
      {/* Stats cards column on the right */}
      <div className="flex flex-1 justify-between flex-row lg:flex-col gap-5 lg:gap-4 w-full lg:w-auto">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-[var(--primary)] rounded-xl px-4 sm:px-6 py-3 sm:py-4 flex-1 lg:flex-none lg:min-w-[140px] min-h-[5rem]">
              <CardContent className="flex flex-row items-center justify-between p-0 h-full">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Icon className="text-white w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                  <span className="text-white text-base sm:text-lg font-semibold">{stat.label}</span>
                </div>
                <span className="text-[#D1D600] text-xl sm:text-2xl font-bold">{stat.value}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
    

    {/* Recent Activities Section */}
    <Card className="bg-[#b7c7d8] w-full max-w-7xl mt-6 sm:mt-8 rounded-2xl shadow-lg border-0">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2">
        <h3 className="text-lg sm:text-xl font-bold text-[#073567]">Recent Activities</h3>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
        <ul className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-3 top-0 bottom-0 w-1 bg-[#D1D600] rounded-full opacity-30" style={{ zIndex: 0 }} />
          {loadingActivities ? (
            // Skeletons for loading state
            Array.from({ length: 4 }).map((_, idx) => (
              <li
                key={idx}
                className="relative flex flex-col sm:flex-row sm:items-center pl-12 pr-4 py-3 sm:py-4 group"
                style={{ zIndex: 1 }}
              >
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-[#D1D600] rounded-full animate-pulse" />
                <div className="flex-1 mb-2 sm:mb-0">
                  <Skeleton className="w-48 h-5 rounded-lg bg-[var(--primary)]" />
                </div>
                <Skeleton className="ml-0 sm:ml-4 w-20 h-5 rounded-full bg-[var(--primary)]" />
              </li>
            ))
          ) : activities.length === 0 ? (
            <li className="pl-12 py-6 text-[#073567] opacity-70">No recent activities found.</li>
          ) : (
            activities.map((item) => {
              const Icon = activityTypeIcon[item.activity_type] || activityTypeIcon.default;
              return (
                <li
                  key={item.id}
                  className="relative flex flex-col sm:flex-row sm:items-center pl-12 pr-4 py-3 sm:py-4 group hover:bg-[#e6ecf3] rounded-xl transition-colors duration-150"
                  style={{ zIndex: 1 }}
                >
                  {/* Timeline with icon */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center bg-[#D1D600] text-white rounded-full shadow-md border-1 sm:border-2 border-white">
                    <Icon size={10} className="sm:w-6 sm:h-6" />
                  </span>
                  <div className="flex-1 mb-2 sm:mb-0">
                    <span className="text-[#073567] font-semibold text-sm sm:text-base">{item.action}</span>
                  </div>
                  <span className="ml-0 sm:ml-4 px-2 sm:px-3 py-1 rounded-full bg-[#073567] text-white text-xs font-medium opacity-80 w-fit">
                    {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                  </span>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </Card>

    {/* Tickets Table Section */}
    <Card className="w-full max-w-7xl mt-6 sm:mt-8 bg-[#b7c7d8] rounded-2xl shadow-lg">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[#073567]">Tickets</h3>
          <p className="text-[#073567] text-sm sm:text-base opacity-80 mt-1">Your recent patent ticket submissions</p>
        </div>
        <Button className="bg-[#073567] text-white font-bold rounded-lg px-3 sm:px-4 py-1 sm:py-2 text-base sm:text-lg shadow-none hover:bg-[#05294a]">
          <Link to="/tickets" className="text-white no-underline">View all {'>'}</Link>
        </Button>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
        <div className="mt-4 border border-[var(--primary)] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#073567] hover:bg-[#05294a] border-none">
                    <TableHead className="text-white text-base sm:text-lg font-bold py-3 sm:py-4 px-3 sm:px-6 text-left">Title</TableHead>
                    <TableHead className="text-white text-base sm:text-lg font-bold py-3 sm:py-4 px-3 sm:px-6 text-left">Inventors</TableHead>
                    <TableHead className="text-white text-base sm:text-lg font-bold py-3 sm:py-4 px-3 sm:px-6 text-left">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[0,1,2,3,4,5].map((_ticket, idx) => (
                    <TableRow 
                      key={idx} 
                      className={`bg-[#b7c7d8] hover:bg-[#a0b3c8] transition-colors duration-200 ${
                        idx === tickets.length - 1 ? '' : 'border-b border-[var(--primary)]'
                      }`}
                    >
                      <TableCell className="text-[#073567] font-semibold py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base">
                        <div className="truncate max-w-[150px] sm:max-w-[200px] lg:max-w-none">
                          <Skeleton className="w-full h-6 sm:h-8 bg-[var(--primary)] rounded-lg" />
                        </div>
                      </TableCell>
                      <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex items-center">
                          <div className="flex -space-x-2 sm:-space-x-3">
                            {[0,1,2,3].map((_inv, i) => (
                              <Skeleton key={i} className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-[var(--primary)] rounded-lg" />
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                        <Skeleton className="w-24 h-6 sm:h-8 bg-[var(--primary)] rounded inline-flex items-center justify-center text-xs sm:text-sm font-medium" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              tickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-[#073567] text-lg font-semibold bg-[#b7c7d8]">
                  No tickets found.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#073567] hover:bg-[#05294a] border-none">
                      <TableHead className="text-white text-base sm:text-lg font-bold py-3 sm:py-4 px-3 sm:px-6 text-left">Title</TableHead>
                      <TableHead className="text-white text-base sm:text-lg font-bold py-3 sm:py-4 px-3 sm:px-6 text-left">Inventors</TableHead>
                      <TableHead className="text-white text-base sm:text-lg font-bold py-3 sm:py-4 px-3 sm:px-6 text-left">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.map((ticket, idx) => (
                      <TableRow 
                        key={ticket.id || idx} 
                        className={`bg-[#b7c7d8] hover:bg-[#a0b3c8] transition-colors duration-200 ${
                          idx === tickets.length - 1 ? '' : 'border-b border-[var(--primary)]'
                        }`}
                      >
                        <TableCell className="text-[#073567] font-semibold py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base">
                          <div className="truncate max-w-[150px] sm:max-w-[200px] lg:max-w-none">{ticket.title}</div>
                        </TableCell>
                        <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                          <div className="flex items-center">
                            <div className="flex -space-x-2 sm:-space-x-3">
                              {ticket.inventors.slice(0, 4).map((inv, i) => (
                                <Avatar key={i} className="border rounded border-[#D1D600] bg-white shadow w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10" style={{ zIndex:  i + 1 }}>
                                  <AvatarImage src={inv.img} alt={inv.name} />
                                  <AvatarFallback className='rounded text-xs sm:text-sm'>{inv.name[0]}</AvatarFallback>
                                </Avatar>
                              ))}
                              {ticket.inventors.length > 4 && (
                                <Avatar className="border rounded border-[#D1D600] bg-white shadow w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10" style={{ zIndex:  ticket.inventors.length }}>
                                  <AvatarFallback className='rounded bg-[var(--primary)] text-white text-xs sm:text-sm'>
                                    +{ticket.inventors.length - 4}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                          <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            {ticket.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )
            )}
          </div>
        </div>
      </div>
    </Card>

  </>
  )
};

export default Dashboard;