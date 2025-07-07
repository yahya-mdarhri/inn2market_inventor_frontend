import { useEffect, useState } from "react"
import "./Tickets.css"
import { TicketsHero } from "./components/TicketsHero"
import { TicketsTable } from "./components/TicketsTable"
import type { Ticket } from "@/types"
import axios from "axios"
import { Helmet } from '@dr.pogodin/react-helmet'


export function Tickets() {
  const [isLoading, setIsLoading] = useState(true)
  const [tickets, setTickets] = useState<Ticket[]>([])

  // Get tickets from API
  useEffect(() => {
    axios.get<Ticket[]>('/api/inventors/tickets')
      .then(response => {
        setTickets(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error("Error fetching tickets:", error)
      })
  }, [setTickets])

  return (
    <>
      <Helmet>
        <title>Tickets | Inventor Portal</title>
        <meta property="og:title" content="Tickets | Inventor Portal" />
        <meta name="description" content="View and manage all your submitted patent tickets. Track status and details of your inventions." />
        <meta property="og:description" content="View and manage all your submitted patent tickets. Track status and details of your inventions." />
      </Helmet>
      <div className="w-full max-w-[78rem] flex flex-col">
        <TicketsHero tickets={tickets} isLoading={isLoading}/>
        <TicketsTable tickets={tickets} isLoading={isLoading}/>
      </div>
    </>
  )
}

export default Tickets