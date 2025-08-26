import { useEffect, useMemo, useState } from "react"
import "./Patents.css"
import { PatentsHero } from "./components/PatentsHero/PatentsHero"
import { PatentsTable } from "./components/PatentsTable/PatentsTable"
import type { Patent } from "@/types/patent"
import axios from "axios"
import { Helmet } from '@dr.pogodin/react-helmet'
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { LayoutGrid, Table as TableIcon, Search, FileSpreadsheet, FileText, FileQuestion } from "lucide-react"
import PatentCard from "@/components/ui/PatentCard/PatentCard"
import * as XLSX from "xlsx"

export function Patents() {
  const [isLoading, setIsLoading] = useState(true)
  const [patents, setPatents] = useState<Patent[]>([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, _setPageSize] = useState(12)
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards")
  const [cardSearch, setCardSearch] = useState("")
  const totalPages = Math.max(1, Math.ceil(count / pageSize))

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

  const filteredForCards = useMemo(() => {
    const q = cardSearch.trim().toLowerCase()
    if (!q) return patents
    return patents.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.inventors || []).some(inv => inv.preferred_name?.toLowerCase().includes(q))
    )
  }, [patents, cardSearch])

  // Exports for Cards view
  const exportFields: Array<{ key: keyof Patent; label: string }> = [
    { key: "title", label: "Title" },
    { key: "deposit_number", label: "Deposit Number" },
    { key: "deposit_date", label: "Deposit Date" },
    { key: "status", label: "Status" },
    { key: "TRL_level", label: "TRL Level" },
    { key: "CRL_level", label: "CRL Level" },
    { key: "sector", label: "Sector" },
    { key: "nature", label: "Nature" },
    { key: "contract_type", label: "Contract Type" },
  ]

  const patentsToRows = (items: Patent[]) => {
    const fmt = (d?: string) => (d ? new Date(d).toLocaleDateString() : "")
    return items.map(p => {
      const base = exportFields.map(f => {
        const v = p[f.key]
        if (f.key === "deposit_date") return fmt(v as unknown as string)
        return Array.isArray(v) ? (v as unknown as string[]).join("; ") : (v ?? "") as string | number
      })
      const inventors = (p.inventors || []).map(i => i.preferred_name).join("; ")
      return [...base, inventors]
    })
  }

  const exportCardsToCSV = () => {
    const headers = [...exportFields.map(f => f.label), "Inventors"]
    const rows = patentsToRows(filteredForCards)
    const csvContent = [headers, ...rows].map(e => e.map(x => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "patents_cards.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportCardsToExcel = () => {
    const headers = [...exportFields.map(f => f.label), "Inventors"]
    const rows = patentsToRows(filteredForCards)
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows])
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patents")
    XLSX.writeFile(workbook, "patents_cards.xlsx")
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

        {/* View Toggle */}
        <div className="w-full max-w-7xl mx-auto -mt-4 mb-4 px-2 sm:px-0 flex items-center justify-end gap-2">
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
            className={viewMode === "table" ? "bg-[#073567] text-white hover:bg-[#05294a]" : ""}
          >
            <TableIcon className="w-4 h-4" />
            Table
          </Button>
          <Button
            variant={viewMode === "cards" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("cards")}
            className={viewMode === "cards" ? "bg-[#073567] text-white hover:bg-[#05294a]" : ""}
          >
            <LayoutGrid className="w-4 h-4" />
            Cards
          </Button>
        </div>

        {viewMode === "table" ? (
          <PatentsTable 
            patents={patents} 
            isLoading={isLoading}
            count={count}
            page={page}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        ) : (
          <div className="w-full max-w-7xl mx-auto mt-6 sm:mt-10">
            {/* Cards toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 px-2 sm:px-0">
              <div className="relative w-full sm:max-w-xs">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </span>
                <Input
                  placeholder="Search by title or inventor..."
                  value={cardSearch}
                  onChange={e => setCardSearch(e.target.value)}
                  className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#073567] focus:border-[#073567] bg-white text-[#073567] placeholder-gray-400 shadow-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="bg-[#073567] text-white hover:bg-[#05294a]"
                  onClick={exportCardsToCSV}
                >
                  <FileText className="w-4 h-4" />
                  Export CSV
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={exportCardsToExcel}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Export Excel
                </Button>
              </div>
            </div>

            {/* Empty state */}
            {!isLoading && filteredForCards.length === 0 ? (
              <div className="w-full h-[40vh] flex items-center justify-center">
                <div className="text-center max-w-md px-6 py-10 rounded-2xl border border-dashed border-neutral-300 bg-white/60 animate-fade-in-up">
                  <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-[#073567]/10 flex items-center justify-center">
                    <FileQuestion className="w-7 h-7 text-[#073567]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">No patents found</h3>
                  <p className="text-neutral-600 mb-4">Try adjusting your search or view filters. You can also create a new patent from the top.</p>
                  <div className="flex items-center justify-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => setCardSearch("")}>
                      Clear search
                    </Button>
                    <Button size="sm" onClick={() => setViewMode("table")} className="bg-[#073567] text-white hover:bg-[#05294a]">
                      <TableIcon className="w-4 h-4" />
                      View as table
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Responsive animated cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                  {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={`sk-${i}`}
                        className="opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <div className="rounded-lg border border-neutral-200 bg-white p-4">
                          <div className="h-5 w-3/4 bg-neutral-200 rounded mb-3" />
                          <div className="h-4 w-1/2 bg-neutral-200 rounded mb-4" />
                          <div className="h-20 w-full bg-neutral-200 rounded mb-4" />
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="h-10 bg-neutral-200 rounded" />
                            <div className="h-10 bg-neutral-200 rounded" />
                            <div className="h-10 bg-neutral-200 rounded" />
                          </div>
                          <div className="h-8 bg-neutral-200 rounded" />
                        </div>
                      </div>
                    ))
                  ) : (
                    filteredForCards.map((patent, i) => (
                      <div
                        key={patent.id}
                        className="opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <PatentCard patent={patent} />
                      </div>
                    ))
                  )}
                </div>

                {/* Cards pagination */}
                {count > 0 && (
                  <div className="flex items-center justify-center gap-3 mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={isLoading || page <= 1}
                    >
                      Prev
                    </Button>
                    <span className="text-sm text-neutral-700">
                      Page {page} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={isLoading || page >= totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Patents