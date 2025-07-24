import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/shadcn/card";
import type { Patent } from "@/types/patent";
import axios from "axios";
import { FileText, Users, Calendar, Info, FileImage, BadgeCheck,   } from "lucide-react";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Helmet } from '@dr.pogodin/react-helmet';
import type { Inventor } from "@/types/user";

export default function PatentDetails() {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();
  const [patent, setPatent] = useState<Patent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [_deleting, setDeleting] = useState(false);
  const [_inventorDetails, setInventorDetails] = useState<Record<string, Inventor | null>>({});
  const [inventorsLoading, setInventorsLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get<Patent>(`/api/inventors/patent/${id}`)
      .then(res => {
        setPatent(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load patent details.");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!patent || !patent.inventors || patent.inventors.length === 0) return;
    setInventorsLoading(true);
    const fetchInventor = (invId: string) =>
      axios.get<Inventor>(`/api/inventors/inventor/${invId}`)
        .then(res => res.data)
        .catch(() => null);
    Promise.all(patent.inventors.map(invId => fetchInventor(invId as unknown as string)))
      .then(results => {
        const details: Record<string, Inventor | null> = {};
        patent.inventors.forEach((invId, idx) => {
          details[invId as unknown as string] = results[idx];
        });
        setInventorDetails(details);
        setInventorsLoading(false);
      });
  }, [patent]);

  // const handleDelete = async () => {
  //   if (!window.confirm("Are you sure you want to delete this patent? This action cannot be undone.")) {
  //     return;
  //   }
  //   setDeleting(true);
  //   try {
  //     await axios.delete(`/api/inventors/patent/${id}/`);
  //     navigate("/patents");
  //   } catch (err) {
  //     setDeleting(false);
  //     alert("Failed to delete patent.");
  //   }
  // };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Patent Details | Inventor Portal</title>
          <meta property="og:title" content="Patent Details | Inventor Portal" />
          <meta name="description" content="View details and status of your patent. Track progress and updates for your invention." />
          <meta property="og:description" content="View details and status of your patent. Track progress and updates for your invention." />
        </Helmet>
        <Card className="w-full max-w-7xl mx-auto bg-[#b7c7d8] rounded-2xl shadow-lg p-0 mt-10">
          <CardHeader className="flex flex-row justify-between px-8">
            <div>
              <h2 className="text-3xl font-bold text-[#073567] flex gap-2">
                <Skeleton className="inline-block w-9 h-9 rounded-full bg-[#a3b8d8]" />
                <Skeleton className="w-64 h-10 rounded-lg bg-[#a3b8d8]" />
              </h2>
              <div className="text-[#073567] mt-2">
                <Skeleton className="w-40 h-6 rounded bg-[#a3b8d8]" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 px-8 pb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 flex items-center bg-white rounded-xl p-4 shadow-sm border border-blue-100 gap-3 min-w-[220px]">
                <Skeleton className="w-12 h-12 rounded-full bg-[#e3eaf3]" />
                <div>
                  <div className="text-xs text-[#073567] font-semibold uppercase tracking-wide">Deposit Date</div>
                  <Skeleton className="w-32 h-5 rounded bg-[#a3b8d8] mt-1" />
                </div>
              </div>
              <div className="flex-1 flex items-center bg-white rounded-xl p-4 shadow-sm border border-blue-100 gap-3 min-w-[220px]">
                <Skeleton className="w-12 h-12 rounded-full bg-[#e3eaf3]" />
                <div>
                  <div className="text-xs text-[#073567] font-semibold uppercase tracking-wide">Status</div>
                  <Skeleton className="w-32 h-5 rounded bg-[#a3b8d8] mt-1" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {["Abstract", "Affiliation", "TRL Level", "CRL Level", "Contract Type", "Sector", "Nature", "Deposit Document", "Research Report Document", "Delivery Document", "Inventors", "Shemas"].map((label, _idx) => (
                <div key={label} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Skeleton className="w-5 h-5 rounded-full bg-[#a3b8d8]" />
                    <span className="font-semibold text-[#073567]">{label}</span>
                  </div>
                  <div className="ml-7">
                    {label === "Inventors" ? (
                      <div className="flex flex-wrap gap-2">
                        {[1,2,3].map(i => (
                          <Skeleton key={i} className="inline-block h-6 w-24 rounded-full bg-[#a3b8d8]" />
                        ))}
                      </div>
                    ) : label === "Shemas" ? (
                      <div className="flex flex-wrap gap-2">
                        {[1,2].map(i => (
                          <Skeleton key={i} className="inline-block h-6 w-32 rounded bg-[#a3b8d8]" />
                        ))}
                      </div>
                    ) : (
                      <Skeleton className="w-2/3 h-5 rounded bg-[#a3b8d8]" />
                    )}
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
  if (!patent) return null;

  return (
    <>
      <Helmet>
        <title>Patent Details | Inventor Portal</title>
        <meta property="og:title" content="Patent Details | Inventor Portal" />
        <meta name="description" content="View details and status of your patent. Track progress and updates for your invention." />
        <meta property="og:description" content="View details and status of your patent. Track progress and updates for your invention." />
      </Helmet>
      <Card className="w-full max-w-7xl mx-auto bg-[#b7c7d8] rounded-2xl shadow-lg p-0 mt-10">
        <CardHeader className="flex flex-row justify-between px-8">
          <div>
            <h2 className="text-3xl font-bold text-[#073567] flex gap-2">
              <FileText className="inline-block w-9 h-9 text-[#073567] align-middle" />
              {patent.title}
            </h2>
            <div className="text-[#073567] mt-2">Deposit Number: <span className="font-semibold">{patent.deposit_number}</span></div>
          </div>
        </CardHeader>
        <CardContent className="p-0 px-8 pb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 flex items-center bg-white rounded-xl p-4 shadow-sm border border-blue-100 gap-3 min-w-[220px]">
              <div className="flex items-center justify-center bg-[#e3eaf3] rounded-full w-12 h-12">
                <Calendar className="w-6 h-6 text-[#073567]" />
              </div>
              <div>
                <div className="text-xs text-[#073567] font-semibold uppercase tracking-wide">Deposit Date</div>
                <div className="text-[#073567] font-bold text-lg">{patent.deposit_date}</div>
              </div>
            </div>
            <div className="flex-1 flex items-center bg-white rounded-xl p-4 shadow-sm border border-blue-100 gap-3 min-w-[220px]">
              <div className="flex items-center justify-center bg-[#e3eaf3] rounded-full w-12 h-12">
                <BadgeCheck className="w-6 h-6 text-[#073567]" />
              </div>
              <div>
                <div className="text-xs text-[#073567] font-semibold uppercase tracking-wide">Status</div>
                <div className="text-[#073567] font-bold text-lg">{patent.status}</div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">Abstract</span>
              </div>
              <div className="ml-7">{patent.abstract}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">Affiliation</span>
              </div>
              <div className="ml-7">{patent.affiliation}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">TRL Level</span>
              </div>
              <div className="ml-7">{patent.TRL_level}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">CRL Level</span>
              </div>
              <div className="ml-7">{patent.CRL_level}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">Contract Type</span>
              </div>
              <div className="ml-7">{patent.contract_type}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">Sector</span>
              </div>
              <div className="ml-7">{patent.sector}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">Nature</span>
              </div>
              <div className="ml-7">{patent.nature}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <FileImage className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">Deposit Document</span>
              </div>
              <div className="ml-7">
                <a href={patent.deposit_document} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  View Deposit Document
                </a>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <FileImage className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">Research Report Document</span>
              </div>
              <div className="ml-7">
                <a href={patent.research_report_document} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  View Research Report Document
                </a>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <FileImage className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">Delivery Document</span>
              </div>
              <div className="ml-7">
                <a href={patent.delivery_document} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  View Delivery Document
                </a>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">Inventors</span>
              </div>
              <div className="ml-7 flex flex-wrap gap-2">
                {inventorsLoading ? (
                  <Skeleton className="h-6 w-32 rounded animate-pulse bg-[#a3b8d8]" />
                ) : (
                  patent.inventors.map((inv, idx) => {
                    return (
                      <span key={idx} className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold">
                        {inv?.preferred_name}
                      </span>
                    );
                  })
                )}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-5 h-5 text-[#073567]" />
                <span className="font-semibold text-[#073567]">Shemas</span>
              </div>
              <div className="ml-7 flex flex-wrap gap-2">
                {patent.shemas && patent.shemas.length > 0 ? (
                  patent.shemas.map((schema, idx) => (
                    <a key={idx} href={schema} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                      View Schema {idx + 1}
                    </a>
                  ))
                ) : (
                  <span className="text-gray-500">No schemas available.</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}