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