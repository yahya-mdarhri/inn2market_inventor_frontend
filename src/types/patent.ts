import type { Inventor } from "./user"

// Global Patent type definition
export type Patent = {
  id: string
  title: string
  deposit_date: string
  deposit_number: number
  deposit_document: string
  research_report_date: string
  research_report_results: string
  research_report_document: string
  delivery_date: string
  delivery_document: string
  status: string
  inventors: Inventor[]
  TRL_level: number
  CRL_level: number
  affiliation: string
  abstract: string
  contract_type: string
  sector: string
  nature: string
  shemas: string[]
}

// Patent status
export enum PatentStatus {
  A1 = "A1",
  B1 = "B1",
}

// Patent research report results
export enum PatentResearchReportResults {
  MAI = "MAI",
  MR = "MR",
  B1 = "B1",
  REFUSE = "refuse"
}

// Patent contract type
export enum PatentContractType {
  A = "A",
  B = "B",
  C = "C",
}

// Patent sector
export enum PatentSector {
  AD = "Aerospace & Defense",
  AGR = "Agriculture",
  AT = "Automotive & Transportation",
  BT = "Biotechnology",
  CM = "Chemicals & Materials",
  CG = "Consumer Goods",
  E = "Electronics",
  ER = "Energy & Renewables",
  HP = "Healthcare & Pharmaceuticals",
  IT = "Information Technology & Software",
  MI = "Manufacturing & Industrial Equipment",
  T = "Telecommunications",
}

// Patent nature
export enum PatentNature {
  METHOD = "METHOD",
  SYSTEM = "SYSTEM",
  PRODUCT = "PRODUCT",
  DEVICE = "DEVICE",
  MATERIAL = "MATERIAL",
}