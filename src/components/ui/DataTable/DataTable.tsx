import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shadcn/table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useState, useMemo } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

// Add a simple skeleton component
function Skeleton({ className }: { className?: string }) {
  return <div className={"animate-pulse bg-[#073567] opacity-1 rounded " + (className || "")}></div>;
}

interface TableCol {
  key: string;
  label: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
  isLoadingRender?: (value: any) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps {
  data: any[];
  colums: TableCol[];
  isLoading?: boolean;
  onRowClick?: (row: any) => void;
}

function DataTable({ data = [], colums, isLoading = false, onRowClick }: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>("asc");
  const [colsWidth, setColsWidth] = useState<Record<string, number>>(() => (
    colums.reduce((acc, col) => {
      acc[col.key] = col.width ? parseInt(col.width) : 300;
      return acc;
    }, {} as Record<string, number>)
  ));
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    if (!sortKey) return data;
    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (Array.isArray(aVal) && Array.isArray(bVal)) {
        return aVal.join(", ").localeCompare(bVal.join(", ")) * (sortDirection === 'asc' ? 1 : -1);
      }
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * (sortDirection === 'asc' ? 1 : -1);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * (sortDirection === 'asc' ? 1 : -1);
      }
      return 0;
    });
    return sorted;
  }, [data, sortKey, sortDirection]);

  // Skeleton rows for loading
  const skeletonRows = Array.from({ length: 8 });

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-[#073567] text-lg font-semibold bg-[#b7c7d8]">
        No data found.
      </div>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#073567eb] hover:bg-[#073567eb] border-none">
          {colums.map((col, idx, arr) => (
            <TableHead
              key={col.key}
              className={
                "text-white text-base font-bold py-3 px-3 text-left min-w-[140px] relative group transition-colors duration-200" +
                (idx !== arr.length - 1 ? " border-r border-[#073567]" : "")
              }
              style={{
                width: colsWidth[col.key],
                minWidth: 140,
                userSelect: "none",
                paddingRight: 0,
                background: hoveredCol === col.key ? "#0a3a6e" : undefined,
              }}
              onMouseEnter={() => setHoveredCol(col.key)}
              onMouseLeave={() => setHoveredCol(null)}
            >
              <div className="flex items-center select-none justify-between w-full h-full">
                <span>{col.label}</span>
                {col.sortable && (
                  <span
                    className="cursor-pointer ml-1 flex items-center"
                    onClick={() => {
                      if (sortKey === col.key) {
                        setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortKey(col.key);
                        setSortDirection('asc');
                      }
                    }}
                  >
                    {sortKey === col.key ? (
                      sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                    ) : (
                      <ArrowUpDown size={16} className="opacity-60" />
                    )}
                  </span>
                )}
                {/* Resize handle */}
                <ResizableBox
                  width={colsWidth[col.key]}
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
                    setColsWidth(cw => ({ ...cw, [col.key]: size.width }))
                  }
                  draggableOpts={{ enableUserSelectHack: false }}
                />
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? skeletonRows.map((_, idx) => (
              <TableRow key={idx} className="bg-[#b7c7d8] hover:bg-[#a0b3c8] transition-colors duration-200 border-b border-[var(--primary)]">
                {colums.map((col, cidx, arr) => (
                  <TableCell
                    key={col.key}
                    className={
                      "text-[#073567] font-semibold py-3 px-3 text-sm" +
                      (cidx !== arr.length - 1 ? " border-r border-[#073567]" : "")
                    }
                    style={{
                      width: colsWidth[col.key],
                      minWidth: 140,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <Skeleton className="w-full h-6" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : Array.isArray(sortedData) && sortedData.map((item, idx) => (
              <TableRow
                key={item.id || idx}
                className="bg-[#b7c7d8] hover:bg-[#a0b3c8] transition-colors duration-200 border-b border-[var(--primary)] cursor-pointer"
                onClick={() => onRowClick && onRowClick(item)}
              >
                {colums.map((col, cidx, arr) => (
                  <TableCell
                    key={col.key}
                    className={
                      "text-[#073567] font-semibold py-3 px-3 text-sm" +
                      (cidx !== arr.length - 1 ? " border-r border-[#073567]" : "")
                    }
                    style={{
                      width: colsWidth[col.key],
                      minWidth: 140,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {col.render
                      ? col.render(item[col.key], item)
                      : Array.isArray(item[col.key])
                        ? (item[col.key] as string[]).join(", ")
                        :item[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}

export default DataTable;

