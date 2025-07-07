import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/shadcn/card";
import { TICKET_STATUS_COLORS, type Ticket } from "@/types";
import axios from "axios";
import { FileText, Users, Calendar, Info, FileImage, BadgeCheck, Clock, CheckCircle, XCircle, Pencil, Trash2, Trash } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/shadcn/avatar";
import { Skeleton } from "@/components/shadcn/skeleton";

const STATUS_COLORS: Record<string, string> = {
  pending: `${TICKET_STATUS_COLORS.pending.bg} ${TICKET_STATUS_COLORS.pending.text}`,
  approved: `${TICKET_STATUS_COLORS.approved.bg} ${TICKET_STATUS_COLORS.approved.text}`,
  refused: `${TICKET_STATUS_COLORS.refused.bg} ${TICKET_STATUS_COLORS.refused.text}`,
};

export default function TicketDetails() {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get<Ticket>(`/api/inventors/ticket/${id}`)
      .then(res => {
        setTicket(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load ticket details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <Card className="w-full max-w-7xl mx-auto bg-[#b7c7d8] rounded-2xl shadow-lg p-0 mt-10">
          <CardHeader className="flex flex-row justify-between px-8">
              <div>
                <h2 className="text-3xl font-bold text-[#073567] flex items-center gap-2">
                  <FileText className="inline-block w-7 h-7 text-[#073567]" />
                  <Skeleton className="w-48 h-8 rounded-lg animate-pulse bg-[#a3b8d8]" />
                </h2>
              </div>
              <div>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-sm shadow-sm border bg-gray-200 text-gray-700`}
                >
                  <Skeleton className="w-6 h-6 rounded-full animate-pulse mr-2 bg-[#a3b8d8]" />
                  <Skeleton className="w-20 h-5 rounded-lg animate-pulse bg-[#a3b8d8]" />
                </span>
              </div>
          </CardHeader>
          {/* <Separator className="mb-4" /> */}

          <CardContent className="p-0 px-8 pb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 flex items-center bg-white rounded-xl p-4 shadow-sm border border-blue-100 gap-3 min-w-[220px]">
                <div className="flex items-center justify-center bg-[#e3eaf3] rounded-full w-12 h-12">
                  <Calendar className="w-6 h-6 text-[#073567]" />
                </div>
                <div>
                  <div className="text-xs text-[#073567] font-semibold uppercase tracking-wide">Created</div>
                  <div className="text-[#073567] font-bold text-lg">
                    <Skeleton className="w-32 h-5 rounded animate-pulse mb-1 bg-[#a3b8d8]" />
                  </div>
                </div>
              </div>
                <div className="flex-1 flex items-center bg-white rounded-xl p-4 shadow-sm border border-blue-100 gap-3 min-w-[220px]">
                  <div className="flex items-center justify-center bg-[#e3eaf3] rounded-full w-12 h-12">
                    <BadgeCheck className="w-6 h-6 text-[#073567]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#073567] font-semibold uppercase tracking-wide">Meeting</div>
                    <div className="text-[#073567] font-bold text-lg">
                      <Skeleton className="w-32 h-5 rounded animate-pulse mb-1 bg-[#a3b8d8]" />
                    </div>
                  </div>
                </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="w-5 h-5 text-[#073567]" />
                  <span className="font-semibold text-[#073567]">Summary</span>
                </div>
                <div className="ml-7 space-y-2">
                  <Skeleton className="w-4/5 h-4 rounded animate-pulse bg-[#a3b8d8]" />
                  <Skeleton className="w-2/5 h-4 rounded animate-pulse bg-[#a3b8d8]" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="w-5 h-5 text-[#073567]" />
                  <span className="font-semibold text-[#073567]">Context</span>
                </div>
                <div className="ml-7 space-y-2">
                  <Skeleton className="w-4/5 h-4 rounded animate-pulse bg-[#a3b8d8]" />
                  <Skeleton className="w-2/5 h-4 rounded animate-pulse bg-[#a3b8d8]" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="w-5 h-5 text-[#073567]" />
                  <span className="font-semibold text-[#073567]">Problem Identification</span>
                </div>
                <div className="ml-7 space-y-2">
                  <Skeleton className="w-4/5 h-4 rounded animate-pulse bg-[#a3b8d8]" />
                  <Skeleton className="w-2/5 h-4 rounded animate-pulse bg-[#a3b8d8]" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <FileImage className="w-5 h-5 text-[#073567]" />
                  <span className="font-semibold text-[#073567]">Drawings</span>
                </div>
                <div className="ml-7">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                    View Drawing
                  </a>
                </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-5 h-5 text-[#073567]" />
                    <span className="font-semibold text-[#073567]">Co-Applications</span>
                  </div>
                  <div className="ml-7 flex gap-2">
                    <Skeleton className="w-16 h-4 rounded animate-pulse bg-[#a3b8d8]" />
                  </div>
                </div>
            </div>
          </CardContent>
        </Card>
        {/* Co-Inventors Card */}
          <Card className="w-full max-w-7xl mx-auto bg-[#b7c7d8] rounded-2xl shadow-lg p-0 mt-6 border border-blue-200">
            <CardHeader className="px-8 pt-6 pb-2">
              <h3 className="text-2xl font-bold text-[#073567] flex items-center gap-2">
                <Users className="inline-block w-7 h-7 text-[#073567]" />
                Co-Inventors
              </h3>
              <p className="text-gray-600 mt-1 text-base">These are the co-inventors associated with this ticket.</p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="flex flex-wrap gap-8">
                {[1,2,3,4].map((_, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-[#f3f6fa] rounded-xl p-4 shadow-sm border border-blue-100 w-[300px]">
                    <Skeleton className="h-14 w-14 rounded-full animate-pulse bg-[#a3b8d8]" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="w-24 h-5 rounded animate-pulse bg-[#a3b8d8]" />
                      <Skeleton className="w-16 h-4 rounded animate-pulse bg-[#a3b8d8]" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
      </>
    );
  }
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!ticket) return null;

  return (
    <>
      <Card className="w-full max-w-7xl mx-auto bg-[#b7c7d8] rounded-2xl shadow-lg p-0 mt-10">
        <CardHeader className="flex flex-row justify-between px-8">
            <div>
              <h2 className="text-3xl font-bold text-[#073567] flex items-center gap-2">
                <FileText className="inline-block w-7 h-7 text-[#073567]" />
                {ticket.title}
              </h2>
            </div>
            <div className="flex items-center gap-3">
             <span
               className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-sm shadow-sm border ${STATUS_COLORS[ticket.status] || "bg-gray-200 text-gray-700"}`}
             >
               {ticket.status === "pending" && (
                 <span className="flex items-center justify-center rounded-full p-1 mr-1">
                   <Clock className="w-4 h-4 text-yellow-800 font-bold" />
                 </span>
               )}
               {ticket.status === "approved" && (
                 <span className="flex items-center justify-center rounded-full p-1 mr-1">
                   <CheckCircle className="w-4 h-4 text-green-800 font-bold" />
                 </span>
               )}
               {ticket.status === "refused" && (
                 <span className="flex items-center justify-center rounded-full p-1 mr-1">
                   <XCircle className="w-4 h-4 text-red-800 font-bold" />
                 </span>
               )}
               {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
             </span>
             <button
               aria-label="Edit Ticket"
               title="Edit Ticket"
               className="ml-2 flex items-center justify-center w-9 h-9 rounded-full bg-white border border-blue-200 text-[#073567] hover:bg-blue-100 hover:text-blue-900 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
               onClick={() => {/* TODO: Implement edit navigation */}}
             >
               <Pencil className="w-5 h-5" />
             </button>
             <button
               aria-label="Delete Ticket"
               title="Delete Ticket"
               className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-red-200 text-red-600 hover:bg-red-100 hover:text-red-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
               onClick={() => {/* TODO: Implement delete action */}}
             >
               <Trash className="w-5 h-5" />
             </button>
            </div>
        </CardHeader>
        {/* <Separator className="mb-4" /> */}

        <CardContent className="p-0 px-8 pb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 flex items-center bg-white rounded-xl p-4 shadow-sm border border-blue-100 gap-3 min-w-[220px]">
              <div className="flex items-center justify-center bg-[#e3eaf3] rounded-full w-12 h-12">
                <Calendar className="w-6 h-6 text-[#073567]" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Created</div>
                <div className="text-[#073567] font-bold text-lg">{new Date(ticket.created_at).toLocaleString()}</div>
              </div>
            </div>
            {ticket.meeting_date && (
              <div className="flex-1 flex items-center bg-white rounded-xl p-4 shadow-sm border border-blue-100 gap-3 min-w-[220px]">
                <div className="flex items-center justify-center bg-[#e3eaf3] rounded-full w-12 h-12">
                  <BadgeCheck className="w-6 h-6 text-[#073567]" />
                </div>
                <div>
                  <div className="text-xs text-[#073567] font-semibold uppercase tracking-wide">Meeting</div>
                  <div className="text-[#073567] font-bold text-lg">{new Date(ticket.meeting_date).toLocaleString()}</div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">Summary</span>
              </div>
              <div className="ml-7">
                {ticket.summary}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">Context</span>
              </div>
              <div className="ml-7">{ticket.context}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">Problem Identification</span>
              </div>
              <div className="ml-7">{ticket.problem_identification}</div>
            </div>
            {ticket.drawings && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <FileImage className="w-5 h-5 text-[#073567]" />
                  <span className="font-semibold text-[#073567]">Drawings</span>
                </div>
                <div className="ml-7">
                  <a href={ticket.drawings} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                    View Drawing
                  </a>
                </div>
              </div>
            )}
            {ticket.co_applications && ticket.co_applications.length > 0 && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-[#073567]" />
                  <span className="font-semibold text-[#073567]">Co-Applications</span>
                </div>
                <div className="ml-7">{ticket.co_applications.join(", ")}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {/* Co-Inventors Card */}
      {ticket.co_applications && ticket.co_applications.length > 0 && (
        <Card className="w-full max-w-7xl mx-auto bg-[#b7c7d8] rounded-2xl shadow-lg p-0 mt-6 border border-blue-200">
          <CardHeader className="px-8 pt-6 pb-2">
            <h3 className="text-2xl font-bold text-[#073567] flex items-center gap-2">
              <Users className="inline-block w-7 h-7 text-[#073567]" />
              Co-Inventors
            </h3>
            <p className="text-gray-600 mt-1 text-base">These are the co-inventors associated with this ticket.</p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="flex flex-wrap gap-8">
              {ticket.co_applications.map((name, idx) => {
                const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2);
                return (
                  <div key={idx} className="flex items-center gap-4 bg-[#f3f6fa] rounded-xl p-4 shadow-sm border border-blue-100 w-[300px]">
                    <Avatar className="h-14 w-14 text-2xl font-bold">
                      <AvatarImage src='https://github.com/shadcn.png' alt={name} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-lg text-[#073567]">{name}</div>
                      <div className="text-gray-500 text-sm">CIE</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}