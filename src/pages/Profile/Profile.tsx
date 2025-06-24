import { Card, CardContent } from '@shadcn/card';
import { Avatar, AvatarFallback, AvatarImage } from '@shadcn/avatar';
// import { Separator } from '@shadcn/separator';
import { FileText, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@shadcn/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@shadcn/table';
import './Profile.css';


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

const coinventors = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Lead Researcher',
    avatar: '/avatars/sarah.png',
    initials: 'SJ',
  },
  {
    name: 'Prof. Michael Chen',
    role: 'Technical Advisor',
    avatar: '/avatars/michael.png',
    initials: 'MC',
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Patent Specialist',
    avatar: '/avatars/emily.png',
    initials: 'ER',
  },
  {
    name: 'Prof. David Kim',
    role: 'Research Partner',
    avatar: '/avatars/david.png',
    initials: 'DK',
  },
  {
    name: 'Dr. Lisa Thompson',
    role: 'Innovation Consultant',
    avatar: '/avatars/lisa.png',
    initials: 'LT',
  },
  {
    name: 'Prof. James Wilson',
    role: 'Technical Lead',
    avatar: '/avatars/james.png',
    initials: 'JW',
  },  {
    name: 'Prof. David Kim',
    role: 'Research Partner',
    avatar: '/avatars/david.png',
    initials: 'DK',
  },
  {
    name: 'Dr. Lisa Thompson',
    role: 'Innovation Consultant',
    avatar: '/avatars/lisa.png',
    initials: 'LT',
  },
  {
    name: 'Prof. James Wilson',
    role: 'Technical Lead',
    avatar: '/avatars/james.png',
    initials: 'JW',
  },
];

const Profile = () => (

  <div className="flex flex-col w-full items-center ">

    {/* Profile Hero*/}
    <div className="flex flex-col md:flex-row w-full mx-auto justify-center gap-12">
      {/* Profile Card */}
      <Card className="flex-1 flex flex-row items-center bg-[#073567] rounded-2xl p-6 md:p-8 min-w-[400px] max-w-[575px]">
        <div className="flex-shrink-0 mr-6">
          <Avatar className="h-32 w-32 border-2 rounded-2xl border-[#D1D600]">
            
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className='rounded'>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-center text-left text-white flex-1">
          <span className="text-2xl font-bold leading-tight">Full name</span>
          <span className="text-xl text-[#D1D600] font-medium mb-2">Affiliation</span>
          <span className="text-base opacity-90 mb-1">name@email.com</span>
        </div>
      </Card>
      {/* Stats Cards */}
      <div className="flex flex-col gap-4 min-w-[320px] w-full md:w-auto">
        <Card className="flex flex-row items-center justify-between bg-[#073567] rounded-xl px-6 py-4 flex-1">
          <div className="flex items-center gap-3">
            <FileText className="text-white" size={28} />
            <span className="text-white text-lg font-semibold">Patents</span>
          </div>
          <span className="text-[#D1D600] text-2xl font-bold">15</span>
        </Card>
        <Card className="flex flex-row items-center justify-between bg-[#073567] rounded-xl px-6 py-4 flex-1">
          <div className="flex items-center gap-3">
            <Users className="text-white" size={28} />
            <span className="text-white text-lg font-semibold">Coinventers</span>
          </div>
          <span className="text-[#D1D600] text-2xl font-bold">15</span>
        </Card>
      </div>
    </div>

    {/* Patents Table Section */}
    <Card className="w-full max-w-[950px] mt-8 bg-[#b7c7d8] rounded-2xl shadow-lg mx-4">
      <div className="flex justify-between items-center px-4 sm:px-8 pt-6">
        <h3 className="text-xl font-bold text-[#073567]">Patents</h3>
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

    {/* Co-Inventors Section */}
    <Card className="w-full max-w-[950px] mt-8 bg-[#b7c7d8] rounded-2xl shadow-lg mx-4">
      <div className="flex justify-between items-center px-4 sm:px-8 pt-6">
        <h3 className="text-xl font-bold text-[#073567]">Co-Inventors</h3>
        <Button className="bg-[#073567] text-white font-bold rounded-lg px-4 py-1 text-lg shadow-none hover:bg-[#05294a]">
          View all {'>'}
        </Button>
      </div>
      <div className="flex flex-wrap gap-3 sm:gap-4 p-4 sm:p-8">
        {coinventors.map((inventor, idx) => (
          <Card key={idx} className="bg-[var(--primary)] flex-1 min-w-[250px] sm:min-w-[280px] max-w-[320px] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardContent className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6">
              <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-[#D1D600] rounded-xl flex-shrink-0">
                <AvatarImage src={inventor.avatar} alt={inventor.name} />
                <AvatarFallback className="text-sm sm:text-lg font-bold text-[#073567] bg-white rounded">{inventor.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-bold text-base sm:text-lg mb-1 truncate">{inventor.name}</h4>
                <p className="text-white opacity-90 text-xs sm:text-sm font-medium truncate">{inventor.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Card>
  </div>
);

export default Profile;