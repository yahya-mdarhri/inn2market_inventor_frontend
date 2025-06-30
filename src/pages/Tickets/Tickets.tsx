import { useEffect, useState } from "react"
import "./Tickets.css"
import { TicketsHero } from "./components/TicketsHero"
import { TicketsTable } from "./components/TicketsTable"
import type { Ticket } from "@/types"
import axios from "axios"


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
      <TicketsHero tickets={tickets} isLoading={isLoading}/>
      <TicketsTable tickets={tickets} isLoading={isLoading}/>
    </>
  )
}

export default Tickets