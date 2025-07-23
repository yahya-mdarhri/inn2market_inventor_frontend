import "./PatentsHero.css"
import { Button } from "@/components/shadcn/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card"
import { FileText as PatentIcon, Clock, CheckCircle, Plus, XCircle } from "lucide-react"
import type { Patent } from "@/types/patent"
import { Skeleton } from "@/components/shadcn/skeleton"
import { Link } from "react-router-dom"

interface PatentsHeroProps {
  patents: Patent[],
  isLoading?: boolean
}

export function PatentsHero({ patents, isLoading }: PatentsHeroProps) {
  // Stats calculation
  const total = patents.length
  const pending = patents.filter(t => t.status === "pending").length
  const approved = patents.filter(t => t.status === "approved").length
  const refused = patents.filter(t => t.status === "refused").length

  return (
    <Card className="w-full max-w-7xl mx-auto mb-8 border-0 shadow-xl bg-gradient-to-br from-[#073567] to-[#05294a]">
      <CardHeader className="pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-4xl sm:text-5xl font-extrabold text-white mb-2 flex items-center gap-2">
              <PatentIcon className="text-white w-10 h-10" />
              Patents
            </CardTitle>
            <p className="text-lg text-blue-100 max-w-xl">All your patents in one place. Track, manage, and create new patents with ease. Stay on top of your innovation pipeline!</p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <Button size="lg" className="bg-white text-[#073567] font-bold rounded-lg px-6 py-3 shadow-lg hover:bg-blue-100 flex items-center gap-2 text-lg transition-all duration-200">
              <Link to="/tickets/create" className="flex items-center gap-2 text-[#073567] no-underline"><Plus className="w-6 h-6" />Create Patent</Link>
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default PatentsHero
