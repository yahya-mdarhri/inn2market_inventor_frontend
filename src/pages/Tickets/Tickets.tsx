import "./Tickets.css"
import * as React from "react"
import { TicketsHero } from "./components/TicketsHero"
import { TicketsTable } from "./components/TicketsTable"
import type { Ticket } from "@/types"

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
  {
    id: "3",
    title: "Smart Mug",
    summary: "A mug that keeps your drink at the perfect temperature",
    context: "Home & Kitchen",
    problem_identification: "Drinks get cold too quickly",
    drawings: "smartmug.pdf",
    inventors: ["David Black"],
    co_applications: ["HomeTech"],
    status: "refused",
    meeting_date: "2024-06-15T09:00:00Z",
    created_at: "2024-06-03T10:00:00Z",
  },
]

export function Tickets() {
  return (
    <>
      <TicketsHero tickets={tickets} />
      <TicketsTable tickets={tickets} />
    </>
  )
}

export default Tickets