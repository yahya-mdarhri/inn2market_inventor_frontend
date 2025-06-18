import React from 'react';

const Ticket: React.FC = () => {
  return (
    <div className="page fixed ">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Tickets</h1>
        <p className="text-gray-00">Manage your support tickets and requests</p>
      </div>

      <div className="rounded-lg border bg-white shadow-sm max-w-7xl mt-6">
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Active Tickets</h2>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              New Ticket
            </button>
          </div>
        </div>
        <div className="divide-y">
          {[
            { id: "TK-001", title: "Patent filing assistance", status: "Open", priority: "High" },
            { id: "TK-002", title: "Co-inventor agreement review", status: "In Progress", priority: "Medium" },
            { id: "TK-003", title: "Innovation workshop request", status: "Pending", priority: "Low" },
          ].map((ticket) => (
            <div key={ticket.id} className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{ticket.id}</span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      ticket.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : ticket.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </div>
                <p className="text-gray-600">{ticket.title}</p>
              </div>
              <div className="text-right">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    ticket.status === "Open"
                      ? "bg-blue-100 text-blue-700"
                      : ticket.status === "In Progress"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ticket;