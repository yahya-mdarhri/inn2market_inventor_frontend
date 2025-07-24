export function getPatentHumanValue(column: string, code: string): string {
  const RESEARCH_REPORT_RESULT_REVERSE = {
    A: "MAI",
    B: "MR",
    C: "B1",
    D: "REFUSE",
  }

  const PATENT_STATUS_REVERSE = {
    A: "A1",
    B: "B1",
  }

  const CONTRACT_TYPE_REVERSE = {
    A: "Option A",
    B: "Option B",
    C: "Option C",
  }

  const SECTOR_REVERSE = {
    A: "Aerospace & Defense",
    B: "Agriculture",
    C: "Automotive & Transportation",
    D: "Biotechnology",
    E: "Chemicals & Materials",
    F: "Consumer Goods",
    G: "Electronics",
    H: "Energy & Renewables",
    I: "Healthcare & Pharmaceuticals",
    J: "Information Technology & Software",
    K: "Manufacturing & Industrial Equipment",
    L: "Telecommunications",
  }

  const NATURE_REVERSE = {
    A: "METHOD",
    B: "SYSTEM",
    C: "PRODUCT",
    D: "DEVICE",
    E: "MATERIAL",
  }

  const map: Record<string, string> = (() => {
    switch (column) {
      case "research_report_result":
        return RESEARCH_REPORT_RESULT_REVERSE
      case "status":
        return PATENT_STATUS_REVERSE
      case "contract_type":
        return CONTRACT_TYPE_REVERSE
      case "sector":
        return SECTOR_REVERSE
      case "nature":
        return NATURE_REVERSE
      default:
        return {}
    }
  })()
  if (!map || !code) return code
  return map[code] || (code.length > 100 ? code.slice(0, 100) + '...' : code)
}
