import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/shadcn/card"
import { Button } from "@/components/shadcn/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/shadcn/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar"
import type { Patent } from "@/types/patent"
import { Link } from "react-router-dom"

function PatentCard({ patent }: { patent: Patent }) {
	const formatDate = (iso?: string) => {
		if (!iso) return "-"
		const d = new Date(iso)
		return isNaN(d.getTime()) ? "-" : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })
	}

	const getInitials = (name?: string) => {
		if (!name) return "I"
		const parts = name.trim().split(/\s+/)
		const initials = (parts[0]?.[0] || "") + (parts[1]?.[0] || "")
		return initials.toUpperCase() || "I"
	}

	const trl = Math.max(0, Math.min(9, Number(patent.TRL_level) || 0))
	const crl = Math.max(0, Math.min(9, Number(patent.CRL_level) || 0))

	return (
		<Card className="group relative h-full overflow-hidden transition-shadow hover:shadow-xl flex flex-col">
			{/* Accent bar uses CSS var(--primary) */}
			<div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: "var(--primary)" }} />

			<CardHeader className="pb-3">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<CardTitle className="text-base sm:text-lg md:text-xl line-clamp-2 pr-10">
								<Link
									to={`/patents/${patent.id}`}
									className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm"
									style={{ outlineColor: "var(--primary)" }}
									aria-label={`View details for ${patent.title}`}
                                >
									{patent.title}
								</Link>
							</CardTitle>
						</TooltipTrigger>
						<TooltipContent side="top">{patent.title}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<CardDescription className="mt-2 text-xs sm:text-sm">
					{patent.affiliation || "-"}
				</CardDescription>
			</CardHeader>

			<CardContent className="grid gap-4 flex-1">
				{/* Status and key dates */}
				<div className="flex flex-wrap items-center gap-2">
					<span
						className="px-2 py-1 rounded-md text-xs font-medium border bg-white/50 dark:bg-white/5"
						style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
					>
						Status: {patent.status || "-"}
					</span>
					<span className="text-xs text-neutral-600 dark:text-neutral-300">
						Deposit: <strong className="text-neutral-800 dark:text-neutral-100">{formatDate(patent.deposit_date)}</strong>
					</span>
					{patent.deposit_number != null && (
						<span className="text-xs text-neutral-600 dark:text-neutral-300">
							No. <strong className="text-neutral-800 dark:text-neutral-100">{String(patent.deposit_number)}</strong>
						</span>
					)}
				</div>

				{/* Row 1: Sector + Levels (levels stacked vertically) */}
				<div className="flex items-stretch justify-between gap-3 h-full">
					<div className="flex-1">
						<MetaItem label="Sector" value={patent.sector || "-"} />
					</div>
					<div className="flex flex-col items-start gap-1 h-full">
						<LevelChip label="TRL" value={trl} />
						<LevelChip label="CRL" value={crl} />
					</div>
				</div>

				{/* Row 2: Contract type + Nature */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
					<MetaItem label="Contract" value={patent.contract_type || "-"} />
					<MetaItem label="Nature" value={patent.nature || "-"} />
				</div>

				{/* Inventors list */}
				<div className="flex flex-wrap items-center gap-2 pt-1">
					{(patent.inventors || []).slice(0, 4).map((inv) => (
						<TooltipProvider key={inv.id}>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="flex items-center gap-2 min-w-0">
										<Avatar className="h-7 w-7">
											<AvatarImage src={inv.image} alt={inv.preferred_name || "Inventor"} />
											<AvatarFallback>{getInitials(inv.preferred_name)}</AvatarFallback>
										</Avatar>
										<span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 truncate max-w-[10rem] sm:max-w-[14rem]">
											{inv.preferred_name}
										</span>
									</div>
								</TooltipTrigger>
								<TooltipContent>{inv.preferred_name}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					))}
					{(patent.inventors?.length || 0) > 4 && (
						<span className="text-xs text-neutral-500">+{(patent.inventors!.length - 4)} more</span>
					)}
				</div>
			</CardContent>

			<CardFooter className="flex items-center justify-between gap-2 mt-auto">
				<div className="flex items-center gap-2">
					<span className="px-2 py-1 rounded-md text-xs font-medium border" style={{ borderColor: "var(--primary)", color: "var(--primary)" }}>
						{patent.research_report_results || "No report"}
					</span>
					{patent.research_report_date && (
						<Chip variant="soft">Report: {formatDate(patent.research_report_date)}</Chip>
					)}
				</div>

				<div className="flex items-center gap-2">
					<Button size="sm" variant="outline" className="hidden sm:inline-flex" style={{ borderColor: "var(--primary)", color: "var(--primary)" }} asChild>
						<Link to={`/patents/${patent.id}`} aria-label={`View details for ${patent.title}`}>
							View details
						</Link>
					</Button>
					<Button size="sm" className="sm:hidden" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }} asChild>
						<Link to={`/patents/${patent.id}`} aria-label={`Open ${patent.title}`}>Open</Link>
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}

function MetaItem({ label, value }: { label: string; value: string }) {
	return (
		<div
			className="flex flex-col rounded-md border px-3 py-2 transition-colors"
			style={{ borderColor: "var(--primary)" }}
			title={`${label}: ${value || "-"}`}
		>
			<span className="text-[10px] uppercase tracking-wide text-neutral-500">{label}</span>
			<span className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-50 truncate">{value || "-"}</span>
		</div>
	)
}

function LevelChip({ label, value }: { label: string; value: number }) {
	return (
		<span
			className="px-2 py-1 rounded-md text-xs font-semibold border"
			style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
		>
			{label}: {value}
		</span>
	)
}

function Chip({ children, variant = "solid" }: { children: React.ReactNode; variant?: "solid" | "soft" }) {
	return (
		<span
			className="px-2 py-1 rounded-md text-xs font-medium border"
			style={{
				borderColor: "var(--primary)",
				color: variant === "soft" ? "var(--primary)" : "var(--primary-foreground)",
				backgroundColor: variant === "soft" ? "transparent" : "var(--primary)",
			}}
		>
			{children}
		</span>
	)
}

export default PatentCard