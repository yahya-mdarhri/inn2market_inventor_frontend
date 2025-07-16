import React, { useEffect, useState } from 'react';
import { Card } from '@shadcn/card';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Avatar, AvatarImage, AvatarFallback } from '@shadcn/avatar';
import { Button } from '@shadcn/button';
import axios from 'axios';
import type { Inventor } from '@/types';
import CoInventorsHero from './components/CoInventorsHero/CoInventorsHero';



const CoInventors = () => {
  const [coInventors, setCoInventors] = useState<Inventor[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/inventors/inventor/co-inventors`, {
        params: { page, page_size: pageSize }
      })
      .then(res => {
        setCoInventors(res.data.results);
        setCount(res.data.count);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, pageSize]);

  return (
    <>
      <Helmet>
        <title>Co-Inventors</title>
      </Helmet>
      {/* Hero Section */}
      <CoInventorsHero
        total={count}
        affiliations={coInventors.map(inv => inv.affiliation || "").filter(Boolean)}
      />
      {/* Grid of cards */}
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="text-center text-lg py-16">Loading...</div>
        ) : coInventors.length === 0 ? (
          <div className="text-center text-lg py-16">No co-inventors found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {coInventors.map(inv => (
              <Card
                key={inv.id}
                className="rounded-2xl shadow-lg border border-[var(--primary)] bg-white flex flex-row items-center py-5 px-4 transition-transform hover:scale-[1.03] min-h-[110px]"
              >
                <Avatar className="h-16 w-16 border-2 border-[var(--secondary)] shadow mr-4 flex-shrink-0 rounded-lg">
                  <AvatarImage src={inv.image && inv.image !== "/NULL" ? inv.image : undefined} alt={inv.preferred_name} />
                  <AvatarFallback className='rounded-lg bg-[var(--primary)] text-white text-lg font-bold'>
                    {inv.preferred_name.split(' ').map(w => w[0]).join('').slice(0,2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center min-w-0">
                  <div className="font-bold text-lg text-[var(--primary)] truncate">{inv.preferred_name}</div>
                  <div className="text-sm text-gray-500 truncate">{inv.affiliation || <span className="italic text-gray-300">No affiliation</span>}</div>
                </div>
              </Card>
            ))}
          </div>
        )}
        {/* Pagination controls */}
        <div className="flex justify-center gap-4 mt-10 mb-8">
          <Button
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="self-center">
            Page {page} of {Math.ceil(count / pageSize)}
          </span>
          <Button
            disabled={page * pageSize >= count}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default CoInventors;
