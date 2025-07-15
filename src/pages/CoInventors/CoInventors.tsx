import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@shadcn/card';
import { Button } from '@shadcn/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@shadcn/table';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Avatar, AvatarImage, AvatarFallback } from '@shadcn/avatar';
import type { Inventor } from '@/types/user';
import type { Patent } from '@/types/patent';

// Mock inventors
const inventors: Inventor[] = [
  { id: '1', email: 'sarah@uni.edu', preferred_name: 'Dr. Sarah Johnson', affiliation: 'Uni A', name_variant: [], image: '/avatars/sarah.png' },
  { id: '2', email: 'michael@uni.edu', preferred_name: 'Prof. Michael Chen', affiliation: 'Uni B', name_variant: [], image: '/avatars/michael.png' },
  { id: '3', email: 'emily@uni.edu', preferred_name: 'Dr. Emily Rodriguez', affiliation: 'Uni C', name_variant: [], image: '/avatars/emily.png' },
  { id: '4', email: 'david@uni.edu', preferred_name: 'Prof. David Kim', affiliation: 'Uni D', name_variant: [], image: '/avatars/david.png' },
  { id: '5', email: 'lisa@uni.edu', preferred_name: 'Dr. Lisa Thompson', affiliation: 'Uni E', name_variant: [], image: '/avatars/lisa.png' },
  { id: '6', email: 'james@uni.edu', preferred_name: 'Prof. James Wilson', affiliation: 'Uni F', name_variant: [], image: '/avatars/james.png' },
];

// Mock patents
const patents: Patent[] = [
  { id: 'p1', title: 'Smart Widget', deposit_date: '', deposit_number: 1, deposit_document: '', research_report_date: '', research_report_results: '', research_report_document: '', delivery_date: '', delivery_document: '', status: 'A1', inventors: [inventors[0], inventors[1], inventors[2]], TRL_level: 5, CRL_level: 3, affiliation: '', abstract: '', contract_type: '', sector: 'IT', nature: '', shemas: [] },
  { id: 'p2', title: 'Nano Device', deposit_date: '', deposit_number: 2, deposit_document: '', research_report_date: '', research_report_results: '', research_report_document: '', delivery_date: '', delivery_document: '', status: 'B1', inventors: [inventors[1], inventors[3]], TRL_level: 6, CRL_level: 2, affiliation: '', abstract: '', contract_type: '', sector: 'BT', nature: '', shemas: [] },
  { id: 'p3', title: 'Eco Material', deposit_date: '', deposit_number: 3, deposit_document: '', research_report_date: '', research_report_results: '', research_report_document: '', delivery_date: '', delivery_document: '', status: 'A1', inventors: [inventors[0], inventors[2], inventors[4]], TRL_level: 7, CRL_level: 4, affiliation: '', abstract: '', contract_type: '', sector: 'CM', nature: '', shemas: [] },
  { id: 'p4', title: 'AI System', deposit_date: '', deposit_number: 4, deposit_document: '', research_report_date: '', research_report_results: '', research_report_document: '', delivery_date: '', delivery_document: '', status: 'A1', inventors: [inventors[2], inventors[3], inventors[5]], TRL_level: 8, CRL_level: 5, affiliation: '', abstract: '', contract_type: '', sector: 'IT', nature: '', shemas: [] },
  { id: 'p5', title: 'Green Energy', deposit_date: '', deposit_number: 5, deposit_document: '', research_report_date: '', research_report_results: '', research_report_document: '', delivery_date: '', delivery_document: '', status: 'B1', inventors: [inventors[1], inventors[4], inventors[5]], TRL_level: 9, CRL_level: 6, affiliation: '', abstract: '', contract_type: '', sector: 'ER', nature: '', shemas: [] },
];

function InventorAutocomplete({ label, value, onChange, excludeId }: {
  label: string;
  value: Inventor | null;
  onChange: (inv: Inventor | null) => void;
  excludeId?: string;
}) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = inventors.filter(inv =>
    (!excludeId || inv.id !== excludeId) &&
    (inv.preferred_name.toLowerCase().includes(search.toLowerCase()) ||
     inv.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="relative w-full max-w-xs">
      <label className="block text-[var(--primary)] font-semibold mb-1">{label}</label>
      <input
        ref={inputRef}
        className="border border-[var(--primary)] rounded-2xl px-4 py-2 w-full focus:ring-2 focus:ring-[var(--primary)] focus:outline-none text-base shadow-sm transition-all duration-150 hover:border-[var(--secondary)] bg-white"
        placeholder={`Search ${label.toLowerCase()}...`}
        value={value ? value.preferred_name : search}
        onChange={e => {
          setSearch(e.target.value);
          onChange(null);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        autoComplete="off"
      />
      {open && filtered.length > 0 && !value && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-[var(--primary)] rounded-2xl shadow-lg max-h-64 overflow-auto animate-fade-in">
          {filtered.map(inv => (
            <div
              key={inv.id}
              className="flex items-center gap-4 px-4 py-3 hover:bg-[#e9f1fa] cursor-pointer transition-colors duration-100"
              onMouseDown={() => {
                onChange(inv);
                setSearch('');
                setOpen(false);
                inputRef.current?.blur();
              }}
            >
              <Avatar className="h-10 w-10 border-2 border-[var(--secondary)] shadow">
                <AvatarImage src={inv.image} alt={inv.preferred_name} />
                <AvatarFallback>{inv.preferred_name.split(' ').map(w => w[0]).join('').slice(0,2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-[var(--primary)] text-base">{inv.preferred_name}</span>
                <span className="text-xs text-gray-500">{inv.affiliation}</span>
                <span className="text-xs text-gray-400">{inv.email}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {value && (
        <div className="flex items-center gap-3 mt-3 bg-[#e9f1fa] rounded-2xl px-3 py-2 shadow-inner animate-fade-in">
          <Avatar className="h-9 w-9 border-2 border-[var(--secondary)] shadow">
            <AvatarImage src={value.image} alt={value.preferred_name} />
            <AvatarFallback>{value.preferred_name.split(' ').map(w => w[0]).join('').slice(0,2)}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-[var(--primary)] text-base">{value.preferred_name}</span>
          <Button size="sm" variant="ghost" className="ml-1 px-2 py-0 text-xs text-red-600 hover:bg-red-100" onClick={() => onChange(null)}>
            ×
          </Button>
        </div>
      )}
    </div>
  );
}

const CoInventors = () => {
  const [first, setFirst] = useState<Inventor | null>(null);
  const [second, setSecond] = useState<Inventor | null>(null);
  const [shared, setShared] = useState<Patent[]>([]);
  const [touched, setTouched] = useState(false);

  const handleFind = () => {
    setTouched(true);
    if (!first || !second || first.id === second.id) {
      setShared([]);
      return;
    }
    const sharedPatents = patents.filter(patent =>
      patent.inventors.some(inv => inv.id === first.id) &&
      patent.inventors.some(inv => inv.id === second.id)
    );
    setShared(sharedPatents);
  };

  return (
    <>
      <Helmet>
        <title>Co-Inventors | Shared Patents</title>
      </Helmet>
      {/* <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] py-10 px-2"> */}
        <Card className="w-full max-w-3xl shadow-lg rounded-2xl border border-[var(--primary)] bg-white">
          <CardContent className="p-0">
            <div className="rounded-t-2xl bg-[var(--primary)] px-8 py-6 text-white text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1">Find Shared Patents</h2>
              <div className="text-base sm:text-lg font-medium text-[var(--secondary)]">Between Two Inventors</div>
            </div>
            <div className="flex flex-col gap-6 px-6 py-8 bg-[#b7c7d8] rounded-b-2xl">
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <InventorAutocomplete label="Inventor 1" value={first} onChange={setFirst} excludeId={second?.id} />
                <span className="font-bold text-[var(--primary)] text-2xl">&</span>
                <InventorAutocomplete label="Inventor 2" value={second} onChange={setSecond} excludeId={first?.id} />
              </div>
              <Button
                className="bg-[var(--primary)] text-white font-bold rounded-2xl px-8 py-3 text-lg shadow-lg transition-all duration-150 hover:bg-[var(--secondary)] hover:text-[var(--primary)] disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleFind}
                disabled={!first || !second || first.id === second.id}
              >
                Find Shared Patents
              </Button>
              <div className="text-sm text-gray-700 text-center max-w-xl mx-auto">
                Select two different inventors to see the patents they have in common. Use the search boxes to quickly find inventors by name or email.
              </div>
              <div className="border-t border-[var(--primary)]/20 my-2" />
              {touched && first && second && first.id === second.id && (
                <div className="text-red-600 text-center font-semibold animate-fade-in">Please select two different inventors.</div>
              )}
              {touched && first && second && first.id !== second.id && (
                <div className="animate-fade-in">
                  <h3 className="text-lg font-semibold mb-3 text-[var(--primary)] text-center">Shared Patents</h3>
                  {shared.length === 0 ? (
                    <div className="text-gray-600 text-center">No shared patents found.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table className="rounded-2xl overflow-hidden shadow-md">
                        <TableHeader>
                          <TableRow className="bg-[var(--primary)]">
                            <TableHead className="text-white font-bold text-base">Title</TableHead>
                            <TableHead className="text-white font-bold text-base">Sector</TableHead>
                            <TableHead className="text-white font-bold text-base">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {shared.map((patent, idx) => (
                            <TableRow key={patent.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#e9f1fa]'}>
                              <TableCell className="py-3 px-4 text-base font-medium text-[var(--primary)]">{patent.title}</TableCell>
                              <TableCell className="py-3 px-4 text-base text-[var(--primary)]">{patent.sector}</TableCell>
                              <TableCell className="py-3 px-4 text-base text-[var(--primary)]">{patent.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      {/* </div> */}
    </>
  );
};

export default CoInventors;
