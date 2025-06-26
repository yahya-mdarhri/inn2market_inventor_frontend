import "./Tickets.css"
import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { Search, SlidersHorizontal, FileDown, FileSpreadsheet, FileText } from "lucide-react"
import * as XLSX from "xlsx"
// import DropdownMenu, Checkbox, etc. as needed

// Define the Ticket type based on your Django model
export type Ticket = {
  id: string
  title: string
  summary: string
  context: string
  problem_identification: string
  drawings?: string
  inventors: string[]
  co_applications?: string[]
  status: string
  meeting_date?: string
  created_at: string
}

// Dummy data for now
const tickets: Ticket[] = [
  {
    id: "1",
    title: "New Widget",
    summary: "A new widget for faster processing",
    context: "Manufacturing industry",
    problem_identification: "Current widgets are too slow",
    drawings: "widget1.png",
    inventors: ["Alice Smith", "Bob Jones"],
    co_applications: ["Acme Corp"],
    status: "pending",
    meeting_date: "2024-06-10T10:00:00Z",
    created_at: "2024-06-01T09:00:00Z",
  },
  {
    id: "2",
    title: "Eco Battery",
    summary: "Environmentally friendly battery",
    context: "Consumer electronics",
    problem_identification: "Batteries are not recyclable",
    drawings: "battery2.pdf",
    inventors: ["Carol White"],
    co_applications: ["GreenTech"],
    status: "approved",
    meeting_date: "2024-06-12T14:00:00Z",
    created_at: "2024-06-02T11:30:00Z",
  },
]

const allColumns = [
  { key: "title", label: "Title" },
  { key: "summary", label: "Summary" },
  { key: "context", label: "Context" },
  { key: "problem_identification", label: "Problem Identification" },
  { key: "drawings", label: "Drawings" },
  { key: "inventors", label: "Inventors" },
  { key: "co_applications", label: "Co-Applications" },
  { key: "status", label: "Status" },
  { key: "meeting_date", label: "Meeting Date" },
  { key: "created_at", label: "Created At" },
]

export function TicketsTable() {
  const [search, setSearch] = React.useState("")
  const [visibleCols, setVisibleCols] = React.useState(() => allColumns.map(col => col.key))
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [exportDropdownOpen, setExportDropdownOpen] = React.useState(false)

  // Filter tickets by title or inventor name
  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(search.toLowerCase()) ||
    ticket.inventors.some(inv => inv.toLowerCase().includes(search.toLowerCase()))
  )

  // Export to CSV
  const exportToCSV = () => {
    const headers = allColumns.filter(col => visibleCols.includes(col.key)).map(col => col.label)
    const rows = filteredTickets.map(ticket =>
      allColumns.filter(col => visibleCols.includes(col.key)).map(col => {
        const value = ticket[col.key as keyof Ticket]
        if (Array.isArray(value)) return value.join("; ")
        return value || ""
      })
    )
    const csvContent = [headers, ...rows].map(e => e.map(x => `"${x}"`).join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "tickets.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Export to Excel
  const exportToExcel = () => {
    const headers = allColumns.filter(col => visibleCols.includes(col.key)).map(col => col.label)
    const rows = filteredTickets.map(ticket =>
      allColumns.filter(col => visibleCols.includes(col.key)).map(col => {
        const value = ticket[col.key as keyof Ticket]
        if (Array.isArray(value)) return value.join("; ")
        return value || ""
      })
    )
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows])
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets")
    XLSX.writeFile(workbook, "tickets.xlsx")
  }

  // Toggle column visibility
  const toggleCol = (key: string) => {
    setVisibleCols(cols =>
      cols.includes(key) ? cols.filter(c => c !== key) : [...cols, key]
    )
  }

  return (
    <div className="w-full max-w-4xl lg:max-w-7xl mx-auto mt-6 sm:mt-8 bg-[#b7c7d8] rounded-2xl shadow-lg border-0 p-4 sm:p-6 lg:p-8">
      {/* Features row */}
      <div className="flex flex-row items-center justify-between pb-4 mb-4 gap-2 sm:gap-4">
        {/* Search input with icon */}
        <div className="relative w-full max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </span>
          <Input
            placeholder="Search by title or inventor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#073567] focus:border-[#073567] bg-white text-[#073567] placeholder-gray-400 shadow-sm"
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDropdownOpen(v => !v)}
              className="bg-white border border-gray-300 text-[#073567] font-semibold flex items-center gap-1"
            >
              <SlidersHorizontal size={16} />
              Columns
            </Button>
            {dropdownOpen && (
              <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex flex-col gap-1">
                {allColumns.map(col => (
                  <label key={col.key} className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      checked={visibleCols.includes(col.key)}
                      onChange={() => toggleCol(col.key)}
                    />
                    {col.label}
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <Button
              onClick={() => setExportDropdownOpen(v => !v)}
              size="sm"
              className="bg-[#073567] text-white font-bold rounded-lg px-3 py-1 shadow-none hover:bg-[#05294a] flex items-center gap-1"
            >
              <FileDown size={16} />
              Export
            </Button>
            {exportDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex flex-col gap-1 z-20">
                <button
                  onClick={() => { exportToCSV(); setExportDropdownOpen(false); }}
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 text-[#073567] text-sm"
                >
                  <FileText size={16} />
                  CSV
                </button>
                <button
                  onClick={() => { exportToExcel(); setExportDropdownOpen(false); }}
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 text-green-700 text-sm"
                >
                  <FileSpreadsheet size={16} />
                  Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Table section */}
      <div className="border border-[var(--primary)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto w-full">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-[#073567] border-none">
                {allColumns.filter(col => visibleCols.includes(col.key)).map(col => (
                  <TableHead key={col.key} className="text-white text-base font-bold py-3 px-3 text-left">
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map(ticket => (
                <TableRow key={ticket.id} className="bg-[#b7c7d8] hover:bg-[#a0b3c8] transition-colors duration-200 border-b border-[var(--primary)]">
                  {allColumns.filter(col => visibleCols.includes(col.key)).map(col => (
                    <TableCell key={col.key} className="text-[#073567] font-semibold py-3 px-3 text-sm">
                      {col.key === "status" ? (
                        <span
                          className={
                            "px-2 py-1 rounded-full text-xs font-bold " +
                            (ticket.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : ticket.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : ticket.status === "refused"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800")
                          }
                        >
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </span>
                      ) : Array.isArray(ticket[col.key as keyof Ticket])
                        ? (ticket[col.key as keyof Ticket] as string[]).join(", ")
                        : ticket[col.key as keyof Ticket]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default TicketsTable