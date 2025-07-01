// Global Ticket type definition
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

// Ticket status enum
export enum TicketStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REFUSED = "refused"
}

// Ticket status display labels
export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  [TicketStatus.PENDING]: "Pending",
  [TicketStatus.APPROVED]: "Approved",
  [TicketStatus.REFUSED]: "Refused"
}

// Ticket status colors for UI
export const TICKET_STATUS_COLORS: Record<TicketStatus, { bg: string; text: string }> = {
  [TicketStatus.PENDING]: { bg: "bg-yellow-100", text: "text-yellow-800" },
  [TicketStatus.APPROVED]: { bg: "bg-green-100", text: "text-green-800" },
  [TicketStatus.REFUSED]: { bg: "bg-red-100", text: "text-red-800" }
} 