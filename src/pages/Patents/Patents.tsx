import { useEffect, useState } from "react"
import "./Patents.css"
import { PatentsHero } from "./components/PatentsHero/PatentsHero"
import { PatentsTable } from "./components/PatentsTable/PatentsTable"
import type { Patent } from "@/types/patent"
import axios from "axios"
import { Helmet } from '@dr.pogodin/react-helmet'

export function Patents() {
  const [isLoading, setIsLoading] = useState(true)
  const [patents, setPatents] = useState<Patent[]>([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, _setPageSize] = useState(100)

  // Get patents from API with pagination
  const fetchPatents = (pageNum = page, pageSz = pageSize) => {
    setIsLoading(true)
    axios.get(`/api/inventors/patents/?page=${pageNum}&page_size=${pageSz}`)
      .then(response => {
        setPatents(response.data.results)
        setCount(response.data.count)
        setIsLoading(false)
      })
      .catch(error => {
        console.error("Error fetching patents:", error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchPatents(page, pageSize)
  }, [page, pageSize])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <>
      <Helmet>
        <title>Patents | Inventor Portal</title>
        <meta property="og:title" content="Patents | Inventor Portal" />
        <meta name="description" content="View and manage all your submitted patents. Track status and details of your inventions." />
        <meta property="og:description" content="View and manage all your submitted patents. Track status and details of your inventions." />
      </Helmet>
      <div className="w-full max-w-[78rem] flex flex-col">
        <PatentsHero />
        <PatentsTable 
          patents={patents} 
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

export default Patents