import { Card, CardContent } from '@shadcn/card';
import { Avatar, AvatarFallback, AvatarImage } from '@shadcn/avatar';
// import { Separator } from '@shadcn/separator';
import { FileText, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@shadcn/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@shadcn/table';
import './Profile.css';
import { useAuth } from '@context/UserContext';


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

const Profile = () => {
  const { user } = useAuth();

  return (
  <>

    {/* Profile Hero*/}
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto justify-center gap-6 lg:gap-12 lg:h-[220px]">
      {/* Profile Card */}
      <Card className="flex-1 flex flex-col sm:flex-row items-center bg-[#073567] rounded-2xl p-4 sm:p-6 lg:p-8 min-w-0 w-full max-w-[700px] lg:h-full">
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
          <Avatar className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 border-2 rounded-2xl border-[#D1D600]">
            
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className='rounded'>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-center text-center sm:text-left text-white flex-1 min-w-0">
          <span className="text-xl sm:text-2xl font-bold leading-tight">
            {user?.inventor?.preferred_name || 'Full Name'}
          </span>
          <span className="text-lg sm:text-xl text-[#D1D600] font-medium mb-2">
            {user?.inventor?.affiliation || 'Affiliation'}
          </span>
          <span className="text-sm sm:text-base opacity-90 mb-1 break-all">
            {user?.email}
          </span>
        </div>
      </Card>
      {/* Stats Cards */}
      <div className="flex flex-1 flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4 min-w-0 w-full lg:w-auto lg:h-full">
        <Card className="flex flex-row items-center justify-between bg-[#073567] rounded-xl px-4 sm:px-6 py-3 sm:py-4 flex-1 h-auto lg:h-0 lg:min-h-0 lg:max-h-full">
          <div className="flex items-center gap-2 sm:gap-3">
            <FileText className="text-white w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            <span className="text-white text-base sm:text-lg font-semibold">Patents</span>
          </div>
          <span className="text-[#D1D600] text-xl sm:text-2xl font-bold">15</span>
        </Card>
        <Card className="flex flex-row items-center justify-between bg-[#073567] rounded-xl px-4 sm:px-6 py-3 sm:py-4 flex-1 h-auto lg:h-0 lg:min-h-0 lg:max-h-full">
          <div className="flex items-center gap-2 sm:gap-3">
            <Users className="text-white w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            <span className="text-white text-base sm:text-lg font-semibold">Coinventors</span>
          </div>
          <span className="text-[#D1D600] text-xl sm:text-2xl font-bold">15</span>
        </Card>
      </div>
    </div>

    {/* Patents Table Section */}
    <Card className="w-full max-w-7xl mt-6 sm:mt-8 bg-[#b7c7d8] rounded-2xl shadow-lg">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <h3 className="text-lg sm:text-xl font-bold text-[#073567]">Patents</h3>
        <Button className="bg-[#073567] text-white font-bold rounded-lg px-3 sm:px-4 py-1 sm:py-2 text-base sm:text-lg shadow-none hover:bg-[#05294a]">
          View all {'>'}
        </Button>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
        <div className="mt-4 border border-[var(--primary)] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
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
                    key={idx} 
                    className={`bg-[#b7c7d8] hover:bg-[#a0b3c8] transition-colors duration-200 ${
                      idx === tickets.length - 1 ? '' : 'border-b border-[var(--primary)]'
                    }`}
                  >
                    <TableCell className="text-[#073567] font-semibold py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base">
                      <div className="truncate max-w-[200px] sm:max-w-none">{ticket.title}</div>
                    </TableCell>
                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="flex items-center">
                        <div className="flex -space-x-2 sm:-space-x-3">
                          {ticket.inventors.slice(0, 4).map((inv, i) => (
                            <Avatar key={i} className="border rounded border-[#D1D600] bg-white shadow w-8 h-8 sm:w-10 sm:h-10" style={{ zIndex:  i + 1 }}>
                              <AvatarImage src={inv.img} alt={inv.name} />
                              <AvatarFallback className='rounded text-xs sm:text-sm'>{inv.name}</AvatarFallback>
                            </Avatar>
                          ))}
                          <Avatar className="border rounded border-[#D1D600] bg-white shadow w-8 h-8 sm:w-10 sm:h-10" style={{ zIndex:  ticket.inventors.length }}>
                             <AvatarFallback className='rounded bg-[var(--primary)] text-white text-xs sm:text-sm'>
                              +{ticket.inventors.length - 4}
                            </AvatarFallback>
                          </Avatar>
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
          </div>
        </div>
      </div>
    </Card>

    {/* Co-Inventors Section */}
    <Card className="w-full max-w-7xl mt-6 sm:mt-8 bg-[#b7c7d8] rounded-2xl shadow-lg">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[#073567]">Co-Inventors</h3>
          <p className="text-[#073567] text-sm sm:text-base opacity-80 mt-1">Collaborators who contributed to your patents</p>
        </div>
        <Button className="bg-[#073567] text-white font-bold rounded-lg px-3 sm:px-4 py-1 sm:py-2 text-base sm:text-lg shadow-none hover:bg-[#05294a]">
          View all {'>'}
        </Button>
      </div>
      <div className="flex flex-wrap gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8">
        {coinventors.map((inventor, idx) => (
          <Card key={idx} className="bg-[var(--primary)] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex-1 min-w-[32%] max-w-full sm:max-w-[48%] lg:max-w-[31%] xl:max-w-[23%]">
            <CardContent className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 border-2 border-[#D1D600] rounded-xl flex-shrink-0">
                <AvatarImage src={inventor.avatar} alt={inventor.name} />
                <AvatarFallback className="text-xs sm:text-sm lg:text-base font-bold text-[#073567] bg-white rounded">{inventor.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1 truncate leading-tight">{inventor.name}</h4>
                <p className="text-white opacity-90 text-xs sm:text-sm font-medium truncate leading-tight">{inventor.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Card>

  </>
)};

export default Profile;