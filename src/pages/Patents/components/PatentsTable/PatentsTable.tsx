import "./PatentsTable.css"
import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card"
import { Search, SlidersHorizontal, FileDown, FileSpreadsheet, FileText, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react"
import * as XLSX from "xlsx"
import { ResizableBox } from "react-resizable"
import "react-resizable/css/styles.css"
import { type Patent } from "@/types/patent"
import { TicketStatus, TICKET_STATUS_COLORS, type Inventor } from "@/types"
import { Skeleton } from "@/components/shadcn/skeleton"
import { useNavigate } from "react-router-dom"

const allColumns = [
  { key: "title", label: "Title" },
  { key: "deposit_number", label: "Deposit Number" },
  { key: "deposit_document", label: "Deposit Document" },
  { key: "deposit_date", label: "Deposit Date" },
  { key: "research_report_document", label: "Research Report Document" },
  { key: "research_report_result", label: "Research Result" },
  { key: "research_report_date", label: "Research Date" },
  { key: "delivery_document", label: "Delivery Document" },
  { key: "delivery_date", label: "Delivery Date" },
  { key: "status", label: "Status" },
  { key: "TRL_level", label: "TRL Level" },
  { key: "CRL_level", label: "CRL Level" },
  { key: "abstract", label: "Abstract" },
  { key: "contract_type", label: "Contract Type" },
  { key: "sector", label: "Sector" },
  { key: "nature", label: "Nature" },
  { key: "schemas", label: "Schemas" },
  { key: "affiliation", label: "Affiliation" },
  // { key: "inventors", label: "Inventors" },
];


interface PatentsTableProps {
  patents: Patent[],
  isLoading?: boolean,
  count: number,
  page: number,
  pageSize: number,
  onPageChange: (newPage: number) => void
}

export function PatentsTable({ patents , isLoading}: PatentsTableProps) {
  const [search, setSearch] = React.useState("")
  const [visibleCols, setVisibleCols] = React.useState(() => allColumns.map(col => col.key))
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [exportDropdownOpen, setExportDropdownOpen] = React.useState(false)
  // Sorting state
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>("asc")
  const [colWidths, setColWidths] = React.useState(() => {
    const initial: Record<string, number> = {}
    allColumns.forEach(col => { initial[col.key] = 300 }) // wider default
    return initial
  })
  const [hoveredCol, setHoveredCol] = React.useState<string | null>(null)
  const [selected, setSelected] = React.useState<string[]>([])
  const navigate = useNavigate()

  // Sorting logic
  const sortedPatents = React.useMemo(() => {
    if (!sortKey) return patents
    const sorted = [...patents].sort((a, b) => {
      const aVal = a[sortKey as keyof Patent]
      const bVal = b[sortKey as keyof Patent]
      if (Array.isArray(aVal) && Array.isArray(bVal)) {
        return aVal.join(", ").localeCompare(bVal.join(", ")) * (sortDirection === 'asc' ? 1 : -1)
      }
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * (sortDirection === 'asc' ? 1 : -1)
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * (sortDirection === 'asc' ? 1 : -1)
      }
      return 0
    })
    return sorted
  }, [patents, sortKey, sortDirection])

  // Filter patents by title or inventor name
  const filteredPatents:Patent[] = sortedPatents.filter(patent =>
    patent.title.toLowerCase().includes(search.toLowerCase()) ||
    patent.inventors.some((inv: Inventor) => inv.preferred_name.toLowerCase().includes(search.toLowerCase()))
  )

  // Handle select all
  const allVisibleIds = filteredPatents.map(t => t.id)
  const isAllSelected = allVisibleIds.length > 0 && allVisibleIds.every(id => selected.includes(id))
  const isIndeterminate = selected.length > 0 && !isAllSelected

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected([])
    } else {
      setSelected(allVisibleIds)
    }
  }

  const toggleSelect = (id: string) => {
    setSelected(sel =>
      sel.includes(id) ? sel.filter(sid => sid !== id) : [...sel, id]
    )
  }

  // Export to CSV (only selected if any, else all)
  const exportToCSV = () => {
    const exportPatents = selected.length > 0
      ? filteredPatents.filter(t => selected.includes(t.id))
      : filteredPatents
    const headers = allColumns.filter(col => visibleCols.includes(col.key)).map(col => col.label)
    const rows = exportPatents.map(patent =>
      allColumns.filter(col => visibleCols.includes(col.key)).map(col => {
        const value = patent[col.key as keyof Patent]
        if (Array.isArray(value)) return value.join("; ")
        return value || ""
      })
    )
    const csvContent = [headers, ...rows].map(e => e.map(x => `"${x}"`).join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "patents.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link) 
  }

  // Export to Excel (only selected if any, else all)
  const exportToExcel = () => {
    const exportPatents = selected.length > 0
      ? filteredPatents.filter(t => selected.includes(t.id))
      : filteredPatents
    const headers = allColumns.filter(col => visibleCols.includes(col.key)).map(col => col.label)
    const rows = exportPatents.map(patent =>
      allColumns.filter(col => visibleCols.includes(col.key)).map(col => {
        const value = patent[col.key as keyof Patent]
        if (Array.isArray(value)) return value.join("; ")
        return value || ""
      })
    )
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows])
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patents")
    XLSX.writeFile(workbook, "patents.xlsx")
  }

  // Toggle column visibility
  const toggleCol = (key: string) => {
    setVisibleCols(cols =>
      cols.includes(key) ? cols.filter(c => c !== key) : [...cols, key]
    )
  }

  return (
    <Card className="w-full max-w-7xl mx-auto mt-6 sm:mt-10 shadow-xl border-0 bg-[#b7c7d8]">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-bold text-[#073567]">Patents</CardTitle>
        <p className="text-gray-600 mt-1">Manage and review all submitted patents. Use the filters and export options to work efficiently.</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-row items-center justify-between pb-4 mb-4 gap-2 sm:gap-4">
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
          <div className="overflow-x-auto w-full custom-scrollbar">
            {(!isLoading && filteredPatents.length === 0) ? (
              <div className="flex flex-col items-center justify-center py-16 text-[#073567] text-lg font-semibold bg-[#b7c7d8]">
                No patents found.
              </div>
            ) : (
            <Table>
              {/* Table coluumns header */}
              <TableHeader>
                <TableRow className="bg-[#073567eb] hover:bg-[#073567eb] border-none">
                  {/* Checkbox column */}
                  <TableHead
                    className="text-white text-base font-bold py-3 px-3 text-left min-w-[40px] w-[40px]"
                    style={{ width: 40, minWidth: 40, maxWidth: 40, userSelect: "none", paddingRight: 0 }}
                  >
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={el => {
                        if (el) el.indeterminate = isIndeterminate
                      }}
                      onChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  {/* Other column */}
                  {allColumns.filter(col => visibleCols.includes(col.key)).map((col, idx, arr) => (
                    <TableHead
                      key={col.key}
                      className={
                        "text-white text-base font-bold py-3 px-3 text-left min-w-[140px] relative group transition-colors duration-200" +
                        (idx !== arr.length - 1 ? " border-r border-[#073567]" : "")
                      }
                      onMouseEnter={() => setHoveredCol(col.key)}
                      onMouseLeave={() => setHoveredCol(null)}
                      style={{
                        width: colWidths[col.key],
                        minWidth: 140,
                        // maxWidth: 500,
                        userSelect: "none",
                        paddingRight: 0,
                        background: hoveredCol === col.key ? "#0a3a6e" : undefined,
                      }}
                    >
                      <div className="flex items-center select-none justify-between w-full h-full">
                        <span>{col.label}</span>
                        <span
                          className="cursor-pointer ml-1 flex items-center"
                          onClick={() => {
                            if (sortKey === col.key) {
                              setSortDirection(d => d === 'asc' ? 'desc' : 'asc')
                            } else {
                              setSortKey(col.key)
                              setSortDirection('asc')
                            }
                          }}
                        >
                          {sortKey === col.key ? (
                            sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                          ) : (
                            <ArrowUpDown size={16} className="opacity-60" />
                          )}
                        </span>
                        {/* Resize handle */}
                          <ResizableBox
                            width={colWidths[col.key]}
                            height={0}
                            axis="x"
                            minConstraints={[140, 0]}
                            maxConstraints={[500, 0]}
                            handle={
                              <span
                                className="group/resize-handle w-4 h-8 flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-col-resize"
                                tabIndex={0}
                                aria-label="Resize column"
                                title="Drag to resize"
                              >
                                <span className="w-1 h-6 bg-[#05294a] rounded transition-all duration-200 group-hover/resize-handle:bg-blue-500 group-active/resize-handle:bg-blue-700" />
                                <span className="ml-1 flex flex-col gap-0.5">
                                  <span className="block w-1 h-1 rounded-full bg-slate-300 opacity-70" />
                                  <span className="block w-1 h-1 rounded-full bg-slate-300 opacity-70" />
                                  <span className="block w-1 h-1 rounded-full bg-slate-300 opacity-70" />
                                </span>
                              </span>
                            }
                            resizeHandles={['e']}
                            onResize={(_, { size }) =>
                              setColWidths(cw => ({ ...cw, [col.key]: size.width }))
                            }
                            draggableOpts={{ enableUserSelectHack: false }}
                          />
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                isLoading?
                [0,1,2,3,4,5,6,7,8].map(patent => (
                  <TableRow key={patent} className="bg-[#b7c7d8] hover:bg-[#a0b3c8] transition-colors duration-200 border-b border-[var(--primary)]">
                    {/* Checkbox cell */}
                    <TableCell
                      className="py-3 px-3 text-sm"
                      style={{ width: 40, minWidth: 40, maxWidth: 40 }}
                    >
                      <input
                        type="checkbox"
                      />
                    </TableCell>
                    {/* Other cell */}
                    {allColumns.filter(col => visibleCols.includes(col.key)).map((col, idx, arr) => (
                      <TableCell
                        key={col.key}
                        className={
                          "text-[#073567] font-semibold py-3 px-3 text-sm" +
                          (idx !== arr.length - 1 ? " border-r border-[#073567]" : "")
                        }
                        style={{
                          width: colWidths[col.key],
                          minWidth: 140,
                          // maxWidth: 500,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}
                      >
                        <Skeleton className="w-full h-6 bg-[#073567] opacity-1 animate-pulse" />
                      </TableCell>
                    ))
                    }
                  </TableRow>
                ))
                :
                filteredPatents.map((patent:Patent) => (
                  <TableRow key={patent.id} className="bg-[#b7c7d8] hover:bg-[#a0b3c8] transition-colors duration-200 border-b border-[var(--primary)]">
                    {/* Checkbox cell */}
                    <TableCell
                      className="py-3 px-3 text-sm"
                      style={{ width: 40, minWidth: 40, maxWidth: 40 }}
                      onClick={e => e.stopPropagation()} // Prevent row click when clicking checkbox
                    >
                      <input
                        type="checkbox"
                        checked={selected.includes(patent.id)}
                        onChange={() => toggleSelect(patent.id)}
                        aria-label={`Select patent ${patent.title}`}
                      />
                    </TableCell>
                    {/* Other cell */}
                    {allColumns.filter(col => visibleCols.includes(col.key)).map((col, idx, arr) => (
                      <TableCell
                        key={col.key}
                        className={
                          "text-[#073567] font-semibold py-3 px-3 text-sm" +
                          (idx !== arr.length - 1 ? " border-r border-[#073567]" : "")
                        }
                        style={{
                          width: colWidths[col.key],
                          minWidth: 140,
                          // maxWidth: 500,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}
                        onClick={() => navigate(`/patents/${patent.id}`)} // Navigate to patent details on click
                        aria-label={`View details for patent ${patent.title}`}
                      >
                        {col.key === "status" ? (
                          <span
                            className={
                              "px-2 py-1 rounded-full text-xs font-bold " +
                              (patent.status === TicketStatus.PENDING
                                ? TICKET_STATUS_COLORS[TicketStatus.PENDING].bg + " " + TICKET_STATUS_COLORS[TicketStatus.PENDING].text
                                : patent.status === TicketStatus.APPROVED
                                ? TICKET_STATUS_COLORS[TicketStatus.APPROVED].bg + " " + TICKET_STATUS_COLORS[TicketStatus.APPROVED].text
                                : patent.status === TicketStatus.REFUSED
                                ? TICKET_STATUS_COLORS[TicketStatus.REFUSED].bg + " " + TICKET_STATUS_COLORS[TicketStatus.REFUSED].text
                                : "bg-gray-100 text-gray-800")
                            }
                          >
                            {patent.status.charAt(0).toUpperCase() + patent.status.slice(1)}
                          </span>
                        ) :
                         (patent as any)[col.key]
                        }
                      </TableCell>
                    ))
                    }
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PatentsTable
