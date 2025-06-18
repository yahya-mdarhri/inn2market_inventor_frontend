import React from 'react';

const Coniventors: React.FC = () => {
  const coInventors = [
    { id: 1, name: 'Alice Johnson', contribution: 'Lead Developer' },
    { id: 2, name: 'Bob Smith', contribution: 'UI/UX Designer' },
    { id: 3, name: 'Charlie Brown', contribution: 'Data Scientist' },
    { id: 4, name: 'Diana Prince', contribution: 'Project Manager' },
    { id: 5, name: 'Ethan Hunt', contribution: 'Quality Assurance' },
  ];
  return (
     <div className="page fixed">
      <h1 className="text-2xl font-bold mb-6  max-w-7xl mt-6">Co-Inventors</h1>
      <div className="bg-neutral-700 rounded-lg p-6">
        <ul className="space-y-4">
          {coInventors.map((inventor) => (
            <li key={inventor.id} className="border-b border-neutral-600 pb-4 last:border-b-0 max-w-7xl mt-6">
              <div className="flex justify-between">
                <span className="text-lg font-medium">{inventor.name}</span>
                <span className="text-sm text-white/80">{inventor.contribution}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Coniventors;