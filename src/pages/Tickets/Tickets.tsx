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
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(100)

  // Get tickets from API with pagination
  const fetchTickets = (pageNum = page, pageSz = pageSize) => {
    setIsLoading(true)
    axios.get(`/api/inventors/tickets/?page=${pageNum}&page_size=${pageSz}`)
      .then(response => {
        setTickets(response.data.results)
        setCount(response.data.count)
        setIsLoading(false)
      })
      .catch(error => {
        console.error("Error fetching tickets:", error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchTickets(page, pageSize)
  }, [page, pageSize])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

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
        <TicketsTable 
          tickets={tickets} 
          isLoading={isLoading}
          count={count}
          page={page}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

export default Tickets