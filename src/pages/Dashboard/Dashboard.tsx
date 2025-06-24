import "./Dashboard.css";
import { Card, CardContent } from '@shadcn/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@shadcn/table';
import { Clock } from 'lucide-react';
import { Button } from '@shadcn/button';
import { MdAdd } from 'react-icons/md';
import heroImage from './images/welcome-image.png';
import { Avatar, AvatarImage, AvatarFallback } from '@shadcn/avatar';
import { MdAddCircle, MdEdit, MdPersonAdd, MdCheckCircle } from "react-icons/md";

const stats = [
  { label: 'Patents', value: 12 },
  { label: 'Tickets', value: 34 },
  { label: 'Co-Inventors', value: 5 },
];

const tickets = [
  {
    title: 'Lorem ipsum dolor',
    inventors: [
      { name: 'A', img: '/avatars/1.png' },
      { name: 'B', img: '/avatars/2.png' },
      { name: 'C', img: '/avatars/3.png' },
      { name: 'D', img: '/avatars/4.png' },
      { name: 'E', img: '/avatars/5.png' },
    ],
    status: 'Pending',
  },
  // Repeat for demo
  {
    title: 'Lorem ipsum dolor',
    inventors: [
      { name: 'A', img: '/avatars/1.png' },
      { name: 'B', img: '/avatars/2.png' },
      { name: 'C', img: '/avatars/3.png' },
      { name: 'D', img: '/avatars/4.png' },
      { name: 'E', img: '/avatars/5.png' },
    ],
    status: 'Pending',
  },
  {
    title: 'Lorem ipsum dolor',
    inventors: [
      { name: 'A', img: '/avatars/1.png' },
      { name: 'B', img: '/avatars/2.png' },
      { name: 'C', img: '/avatars/3.png' },
      { name: 'D', img: '/avatars/4.png' },
      { name: 'E', img: '/avatars/5.png' },
    ],
    status: 'Pending',
  },
  {
    title: 'Lorem ipsum dolor',
    inventors: [
      { name: 'A', img: '/avatars/1.png' },
      { name: 'B', img: '/avatars/2.png' },
      { name: 'C', img: '/avatars/3.png' },
      { name: 'D', img: '/avatars/4.png' },
      { name: 'E', img: '/avatars/5.png' },
    ],
    status: 'Pending',
  },
  {
    title: 'Lorem ipsum dolor',
    inventors: [
      { name: 'A', img: '/avatars/1.png' },
      { name: 'B', img: '/avatars/2.png' },
      { name: 'C', img: '/avatars/3.png' },
      { name: 'D', img: '/avatars/4.png' },
      { name: 'E', img: '/avatars/5.png' },
    ],
    status: 'Pending',
  },
];

const Dashboard = () => (
  <div className="flex flex-col w-full items-center ">
    <div className="flex w-full justify-center gap-12">
      {/* Welcome card */}
      <Card className="flex flex-row items-center bg-[#073567] rounded-2xl px-8 py-10 w-2/3 max-h-[305px] shadow-lg">
        <CardContent className="flex flex-col justify-center flex-1 p-0">
          <h2 className="text-white text-2xl font-bold mb-2">
            Welcome back, <span className="text-[#D1D600]">Hamza</span>
          </h2>
          <p className="text-white text-lg font-semibold mb-1">
            Lorem ipsum dolor sit amet,
          </p>
          <p className="text-white text-lg font-semibold mb-1">
            consectetur adipiscing elit.
          </p>
          <p className="text-white text-lg font-semibold mb-6">
            Maecenas vehicula.
          </p>
          <Button className="bg-[#D1D600] text-[#073567] font-bold text-lg px-6 py-2 rounded-lg flex items-center gap-2 shadow-none hover:bg-[#bdbd00]">
            Submit Your Patent <MdAdd size={22} />
          </Button>
        </CardContent>
        <div className="flex-1 flex justify-end">
          <img
            src={heroImage}
            alt="Welcome"
            className="max-h-56 w-auto rounded-xl"
          />
        </div>
      </Card>
      {/* Stats cards column on the right */}
      <div className="flex flex-col gap-1">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-[var(--primary)] rounded-xl px-6 py-4 min-w-[140px]">
            <CardContent className="flex flex-col items-center p-0">
              <span className="text-white text-lg font-semibold mb-1">{stat.label}</span>
              <span className="text-[#D1D600] text-2xl font-bold">{stat.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    

    {/* Recent Activities Section */}
    <Card className="bg-[#b7c7d8] w-[950px] mt-8 rounded-2xl shadow-lg border-0">
      <div className="flex justify-between items-center px-8 pt-6 pb-2">
        <h3 className="text-xl font-bold text-[#073567]">Recent Activities</h3>
      </div>
      <div className="px-8 pb-6">
        <ul className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-3 top-0 bottom-0 w-1 bg-[#D1D600] rounded-full opacity-30" style={{ zIndex: 0 }} />
          {[
            { activity: "You created a new ticket: 'Patent for Widget X'", time: "2 hours ago", icon: MdAddCircle },
            { activity: "Ticket 'Lorem ipsum dolor' was updated", time: "5 hours ago", icon: MdEdit },
            { activity: "Added co-inventor B to ticket 'Lorem ipsum dolor'", time: "1 day ago", icon: MdPersonAdd },
            { activity: "Patent 'Super Widget' was approved", time: "2 days ago", icon: MdCheckCircle },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <li
                key={idx}
                className={`relative flex items-center pl-12 pr-4 py-4 group hover:bg-[#e6ecf3] rounded-xl transition-colors duration-150`}
                style={{ zIndex: 1 }}
              >
                {/* Timeline dot with icon */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#D1D600] text-white rounded-full shadow-md border-4 border-white">
                  <Icon size={22} />
                </span>
                <div className="flex-1">
                  <span className="text-[#073567] font-semibold">{item.activity}</span>
                </div>
                <span className="ml-4 px-3 py-1 rounded-full bg-[#073567] text-white text-xs font-medium opacity-80">
                  {item.time}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>

    {/* Tickets Table Section */}
    <Card className="w-full max-w-[950px] mt-8 bg-[#b7c7d8] rounded-2xl shadow-lg mx-4">
      <div className="flex justify-between items-center px-4 sm:px-8 pt-6">
        <h3 className="text-xl font-bold text-[#073567]">Tickets</h3>
        <Button className="bg-[#073567] text-white font-bold rounded-lg px-4 py-1 text-lg shadow-none hover:bg-[#05294a]">
          View all {'>'}
        </Button>
      </div>
      <div className="px-4 sm:px-8 pb-6">
        <div className="mt-4 border border-[var(--primary)] rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#073567] hover:bg-[#05294a] border-none">
                <TableHead className="text-white text-lg font-bold py-4 px-6 text-left">Title</TableHead>
                <TableHead className="text-white text-lg font-bold py-4 px-6 text-left">Inventors</TableHead>
                <TableHead className="text-white text-lg font-bold py-4 px-6 text-left">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket, idx) => (
                <TableRow 
                  key={idx} 
                  className={`bg-[#b7c7d8] hover:bg-[#a0b3c8] transition-colors duration-200 ${
                    idx === tickets.length - 1 ? '' : 'border-b border-[var(--primary)]'
                  }`}
                >
                  <TableCell className="text-[#073567] font-semibold py-4 px-6">{ticket.title}</TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center">
                    <div className="flex -space-x-3">
                      {ticket.inventors.slice(0, 4).map((inv, i) => (
                        <Avatar key={i} className="border rounded border-[#D1D600] bg-white shadow" style={{ zIndex:  i + 1 }}>
                          <AvatarImage src={inv.img} alt={inv.name} />
                          <AvatarFallback className='rounded'>{inv.name}</AvatarFallback>
                        </Avatar>
                      ))}
                        <Avatar className="border rounded border-[#D1D600] bg-white shadow" style={{ zIndex:  ticket.inventors.length }}>
                           <AvatarFallback className='rounded bg-[var(--primary)] text-white'>
                            +{ticket.inventors.length - 4}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200">
                      <Clock className="w-4 h-4" />
                      {ticket.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>

  </div>
);

export default Dashboard;