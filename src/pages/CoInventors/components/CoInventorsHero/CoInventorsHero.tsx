import { Card, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Users, School } from "lucide-react";

interface CoInventorsHeroProps {
  total: number;
  affiliations: string[];
}

export function CoInventorsHero({ total, affiliations }: CoInventorsHeroProps) {
  // Remove empty/NULL/duplicate affiliations
  const uniqueAffiliations = Array.from(
    new Set(
      affiliations
        .filter((a) => a && a !== "NULL")
        .map((a) => a.trim())
    )
  );
  const shownAffiliations = uniqueAffiliations.slice(0, 3);
  const moreCount = uniqueAffiliations.length - shownAffiliations.length;

  return (
    <Card className="w-full max-w-7xl mx-auto mb-8 border-0 shadow-xl bg-gradient-to-br from-[#073567] to-[#05294a]">
      <CardHeader className="pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-4xl sm:text-5xl font-extrabold text-white mb-2 flex items-center gap-2">
              <Users className="text-white w-10 h-10" />
              Co-Inventors
            </CardTitle>
            <p className="text-lg text-blue-100 max-w-xl">
              All inventors who share patents with you. Connect, collaborate, and explore your innovation network!
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            {/* Total co-inventors */}
            <div className="bg-white/90 rounded-lg shadow px-4 py-3 flex flex-row justify-between items-center min-w-[190px]">
              <span className="flex items-center gap-2 text-[var(--primary)] font-semibold mb-1">
              <Users className="w-6 h-6" />
              Co-Inventor{total !== 1 ? "s" : ""}
                </span>
              <span className="ml-2 text-s text-gray-500 font-normal">
                {total}
              </span>
            </div>
            {/* Institute matrix card */}
            <div className="bg-white/90 rounded-lg shadow px-4 py-3 flex flex-row justify-between items-center min-w-[190px]">
              <span className="flex items-center gap-2 text-[var(--primary)] font-semibold mb-1">
                <School className="w-6 h-6" />
                Affiliations
              </span>
                <span className="ml-2 text-s text-gray-500 font-normal">
                  {uniqueAffiliations.length}
                </span>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default CoInventorsHero;