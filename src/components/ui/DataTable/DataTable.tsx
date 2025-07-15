import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shadcn/table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { ResizableBox } from "react-resizable";


// Column interface for DataTable component
interface TableCol {
  key: string;// unique identifier for the column
  label: string;// the column header label
  width?: string; // optional width for the column
  render?: (value: any) => React.ReactNode; // for special ui rendering
  isLoadingRender?: (value: any) => React.ReactNode; // for loading state rendering
  sortable?: boolean; // for sorting functionality
}

// Interface for the DataTable component props
interface DataTableProps {
  data: any[]; // for both patents and tickets
  colums: TableCol[]; // columns configuration
  isLoading?: boolean; // for loading state
  onRowClick?: (row: any) => void; // callback for row click events
}

// DataTable is a reusable component for displaying tabular data
// It can be used for both patents and tickets, with customizable columns and loading state
function DataTable({data, colums, isLoading = false, onRowClick}: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [colsWidth, setColsWidth] = useState<Record<string, number>>( () => (
    colums.reduce((acc, col) => {
      acc[col.key] = col.width ? parseInt(col.width) : 120; // default width if not specified
      return acc;
    }, {} as Record<string, number>
  )))
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>("asc")

  return (
    <Table>
      {/* header columns */}
      <TableHeader>
        {/* che */}
        <TableRow
          className="bg-[#073567eb] hover:bg-[#073567eb] border-none">
          {colums.map((col, idx, arr) =>(
            <TableHead
              className={
                "text-white font-bold text-base p-3 transition-colors duration-200 hover:bg-[#0a3a6e]" +
                (idx === arr.length - 1 ? " border-r border-[#073567]" : "") +
                (col.sortable ? " cursor-pointer" : "") +
                (col.width ? ` w-[${col.width}]` : " w-[120px]")
              }
              key={col.key}
            >
              <div className="flex items-center justify-between gap-2">
                <span>
                  {col.label}
                </span>

                <div className="flex justify-end">
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
                </div>
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      {/* other rows */}
      <TableBody>
        {data.map((item) => (
          <TableRow
            key={item.id}>
            {colums.map((col, idx, arr) => (
              <TableCell
              key={`${item.id}-${col.key}`}>
                {item[col.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DataTable;

