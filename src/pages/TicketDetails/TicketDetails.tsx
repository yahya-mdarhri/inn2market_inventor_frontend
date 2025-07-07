import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/shadcn/card";
import { Separator } from "@/components/shadcn/separator";
import type { Ticket } from "@/types";
import axios from "axios";
import { FileText, Users, Calendar, Info, FileImage, BadgeCheck } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  refused: "bg-red-100 text-red-800",
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

  if (loading) return <div className="text-center py-10 text-[#073567]">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!ticket) return null;

  return (
    <>
      <Card className="w-full max-w-7xl mx-auto bg-[#b7c7d8] rounded-2xl shadow-lg p-0 mt-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-8 pt-8 pb-2">
          <div>
            <h2 className="text-3xl font-bold text-[#073567] flex items-center gap-2">
              <FileText className="inline-block w-7 h-7 text-[#073567]" />
              {ticket.title}
            </h2>
          </div>
          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full font-semibold text-sm shadow-sm border ${STATUS_COLORS[ticket.status] || "bg-gray-200 text-gray-700"}`}
            >
              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
            </span>
          </div>
        </div>
        <Separator className="mb-4" />

        <CardContent className="p-0 px-8 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#073567]" />
              <span className="font-semibold text-[#073567]">Created:</span>
              <span className="ml-1">{new Date(ticket.created_at).toLocaleString()}</span>
            </div>
            {ticket.meeting_date && (
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">Meeting:</span>
                <span className="ml-1">{ticket.meeting_date}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#073567]" />
              <span className="font-semibold text-[#073567]">Inventors:</span>
              <span className="ml-1">{ticket.inventors.join(", ")}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">Summary</span>
              </div>
              <div className="ml-7">{ticket.summary}</div>
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
    </>
  );
}