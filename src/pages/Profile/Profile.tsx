import { Card, CardContent } from '@shadcn/card';
import { Avatar, AvatarFallback, AvatarImage } from '@shadcn/avatar';
import { FileText, Users  } from 'lucide-react';
import { Button } from '@shadcn/button';
import './Profile.css';
import { useAuth } from '@context/UserContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from '@dr.pogodin/react-helmet';
import DataTable from '@ui/DataTable/DataTable';
import { type Patent } from '@/types/patent'; 
import { type Inventor } from '@/types/user';
import { Link } from "react-router-dom"

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'sector', label: 'Sector' },
  { key: 'status', label: 'Status' },
];

const Profile = () => {
  const { user } = useAuth();
  const [patents, setPatents] = useState<Patent[]>([]);
  const [_isLoading, setIsLoading] = useState<Boolean>(true);
  const [page, _setPage] = useState(1);
  const [pageSize, _setPageSize] = useState(10);
  const [coInventors, setCoInventors] = useState<Inventor[]>([]);
  const [isLoadingCoInventors, setIsLoadingCoInventors] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get<{results:Patent[]}>('/api/inventors/patents', {
      params: { page, page_size: pageSize }
    })
      .then(response => {
        const data = response.data?.results || [];
        setPatents(data);
        setIsLoading(false)
      })
      .catch(error => {
        console.error("Error fetching patents:", error)
        setIsLoading(false)
      })
  }, [page, pageSize]);

  useEffect(() => {
    setIsLoadingCoInventors(true);
    axios.get('/api/inventors/inventor/co-inventors', {
      params: { page: 1, page_size: 10 }
    })
      .then(response => {
        setCoInventors(response.data.results || []);
        setIsLoadingCoInventors(false);
      })
      .catch(error => {
        console.error("Error fetching co-inventors:", error);
        setIsLoadingCoInventors(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Profile | Inventor Portal</title>
        <meta property="og:title" content="Profile | Inventor Portal" />
        <meta name="description" content="View and edit your inventor profile, see your patents, and manage your account information." />
        <meta property="og:description" content="View and edit your inventor profile, see your patents, and manage your account information." />
      </Helmet>

    {/* Profile Hero*/}
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto justify-center gap-6 lg:gap-12 lg:h-[220px]">
      {/* Profile Card */}
      <Card className="flex-1 flex flex-col sm:flex-row items-center bg-[#073567] rounded-2xl p-4 sm:p-6 lg:p-8 min-w-0 w-full max-w-[700px] lg:h-full">
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
          <Avatar className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 border-2 rounded-2xl border-[#D1D600]">
            <AvatarImage src={user?.inventor?.image} />
            <AvatarFallback className='rounded'>{(user?.inventor?.preferred_name || 'CN').slice(0,2).toUpperCase()}</AvatarFallback>
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
          <span className="text-[#D1D600] text-xl sm:text-2xl font-bold">{user?.inventor?.patents_count}</span>
        </Card>
        <Card className="flex flex-row items-center justify-between bg-[#073567] rounded-xl px-4 sm:px-6 py-3 sm:py-4 flex-1 h-auto lg:h-0 lg:min-h-0 lg:max-h-full">
          <div className="flex items-center gap-2 sm:gap-3">
            <Users className="text-white w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            <span className="text-white text-base sm:text-lg font-semibold">Coinventors</span>
          </div>
          <span className="text-[#D1D600] text-xl sm:text-2xl font-bold">{user?.inventor?.co_inventors_count}</span>
        </Card>
      </div>
    </div>

    {/* Patents Table Section */}
    <Card className="w-full max-w-7xl mt-6 sm:mt-8 bg-[#b7c7d8] rounded-2xl shadow-lg">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <h3 className="text-lg sm:text-xl font-bold text-[#073567]">Patents</h3>
        <Button className="bg-[#073567] text-white font-bold rounded-lg px-3 sm:px-4 py-1 sm:py-2 text-base sm:text-lg shadow-none hover:bg-[#05294a]">
          <Link to="/patents" className="text-white no-underline">View all {'>'}</Link>
        </Button>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
        <div className="mt-4 border border-[var(--primary)] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <DataTable
              data={patents}
              colums={columns}

            />
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
          <Link to="/coinventors" className="text-white no-underline">View all {'>'}</Link>
        </Button>
      </div>
      <div className="flex flex-wrap gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8">
        {isLoadingCoInventors ? (
          <div>Loading...</div>
        ) : coInventors.length === 0 ? (
          <div>No co-inventors found.</div>
        ) : (
          coInventors.map((inventor, _idx) => (
            <Card key={inventor.id} className="bg-[var(--primary)] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex-1 min-w-[32%] max-w-full sm:max-w-[48%] lg:max-w-[31%] xl:max-w-[23%]">
              <CardContent className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6">
                <Avatar className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 border-2 border-[#D1D600] rounded-xl flex-shrink-0">
                  <AvatarImage src={inventor.image && inventor.image !== "/NULL" ? inventor.image : undefined} alt={inventor.preferred_name} />
                  <AvatarFallback className="text-xs sm:text-sm lg:text-base font-bold text-[#073567] bg-white rounded">
                    {inventor.preferred_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1 truncate leading-tight">{inventor.preferred_name}</h4>
                  <p className="text-white opacity-90 text-xs sm:text-sm font-medium truncate leading-tight">{inventor.affiliation || 'No affiliation'}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </Card>

  </>
)};

export default Profile;