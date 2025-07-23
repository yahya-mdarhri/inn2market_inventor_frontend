import "./TicketsHero.css"
import { Button } from "@/components/shadcn/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card"
import { Ticket as TicketIcon, Clock, CheckCircle, Plus, XCircle } from "lucide-react"
import type { Ticket } from "@/types"
import { Skeleton } from "@/components/shadcn/skeleton"
import { Link } from "react-router-dom"

interface TicketsHeroProps {
  tickets: Ticket[],
  isLoading?: boolean
}

export function TicketsHero({ tickets, isLoading }: TicketsHeroProps) {
  // Stats calculation
  const total = tickets.length
  const pending = tickets.filter(t => t.status === "pending").length
  const approved = tickets.filter(t => t.status === "approved").length
  const refused = tickets.filter(t => t.status === "refused").length

  return (
    <Card className="w-full max-w-7xl mx-auto mb-8 border-0 shadow-xl bg-gradient-to-br from-[#073567] to-[#05294a]">
      <CardHeader className="pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-4xl sm:text-5xl font-extrabold text-white mb-2 flex items-center gap-2">
              <TicketIcon className="text-white w-10 h-10" />
              Tickets
            </CardTitle>
            <p className="text-lg text-blue-100 max-w-xl">All your innovation tickets in one place. Track, manage, and create new tickets with ease. Stay on top of your innovation pipeline!</p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <Button size="lg" className="bg-white text-[#073567] font-bold rounded-lg px-6 py-3 shadow-lg hover:bg-blue-100 flex items-center gap-2 text-lg transition-all duration-200">
              <Link to="/tickets/create" className="flex items-center gap-2 text-[#073567] no-underline"><Plus className="w-6 h-6" />Create Ticket</Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <Card className="flex flex-row items-center gap-4 p-4 bg-blue-100 shadow-md border-0 hover:shadow-lg transition-all duration-200 tickets-hero-stats">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-200">
              <TicketIcon className="text-[#073567] w-7 h-7" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-[#073567]">
                {
                !isLoading ?
                total :
                <Skeleton className="w-24 h-8 bg-blue-300 animate-pulse" />
                }
              </CardTitle>
              <div className="text-blue-800 text-sm font-medium">Total Tickets</div>
            </div>
          </Card>
          <Card className="flex flex-row items-center gap-4 p-4 bg-yellow-100 shadow-md border-0 hover:shadow-lg transition-all duration-200 tickets-hero-stats">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-200">
              <Clock className="text-yellow-700 w-7 h-7" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-yellow-700">
                {
                !isLoading ?
                pending :
                <Skeleton className="w-24 h-8 bg-yellow-300 animate-pulse" />
                }
              </CardTitle>
              <div className="text-yellow-900 text-sm font-medium">Pending</div>
            </div>
          </Card>
          <Card className="flex flex-row items-center gap-4 p-4 bg-green-100 shadow-md border-0 hover:shadow-lg transition-all duration-200 tickets-hero-stats">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-200">
              <CheckCircle className="text-green-700 w-7 h-7" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-green-700">
                {
                !isLoading ?
                approved :
                <Skeleton className="w-24 h-8 bg-green-300 animate-pulse" />
                }
              </CardTitle>
              <div className="text-green-900 text-sm font-medium">Approved</div>
            </div>
          </Card>
          <Card className="flex flex-row items-center gap-4 p-4 bg-red-100 shadow-md border-0 hover:shadow-lg transition-all duration-200 tickets-hero-stats">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-200">
              <XCircle className="text-red-700 w-7 h-7" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-red-700">
                {
                !isLoading ?
                refused :
                <Skeleton className="w-24 h-8 bg-red-300 animate-pulse" />
                }
              </CardTitle>
              <div className="text-red-900 text-sm font-medium">Refused</div>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

export default TicketsHero
