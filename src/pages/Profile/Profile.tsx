import { Card, CardHeader, CardContent } from '@/components/shadcn/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar';
// import { Separator } from '@/components/shadcn/separator';
import { FileText, Users } from 'lucide-react';

const Profile = () => (
  <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl mx-auto mt-10 justify-center">
    {/* Profile Card */}
    <Card className="flex-1 flex flex-row items-center bg-[#073567] rounded-2xl p-6 md:p-8 min-w-[320px] max-w-[500px]">
      <div className="flex-shrink-0 mr-6">
        <Avatar className="h-32 w-32 border-2 border-[#D1D600]">
          
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col justify-center text-left text-white flex-1">
        <span className="text-2xl font-bold leading-tight">Full name</span>
        <span className="text-xl text-[#D1D600] font-medium mb-2">Affiliation</span>
        <span className="text-base opacity-90 mb-1">name@email.com</span>
      </div>
    </Card>
    {/* Stats Cards */}
    <div className="flex flex-col gap-4 min-w-[180px] w-full md:w-auto">
      <Card className="flex flex-row items-center justify-between bg-[#073567] rounded-xl px-6 py-4">
        <div className="flex items-center gap-3">
          <FileText className="text-white" size={28} />
          <span className="text-white text-lg font-semibold">Patents</span>
        </div>
        <span className="text-[#D1D600] text-2xl font-bold">15</span>
      </Card>
      <Card className="flex flex-row items-center justify-between bg-[#073567] rounded-xl px-6 py-4">
        <div className="flex items-center gap-3">
          <Users className="text-white" size={28} />
          <span className="text-white text-lg font-semibold">Coinventers</span>
        </div>
        <span className="text-[#D1D600] text-2xl font-bold">15</span>
      </Card>
    </div>
  </div>
);

export default Profile;