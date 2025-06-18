import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="page fixed">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
        <p className="text-gray-100">Welcome to your innovation dashboard</p>
      </div>

      <div className="page">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mt-6">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900">Active Tickets</h3>
          <p className="text-2xl font-bold text-blue-600">12</p>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900">Patents Filed</h3>
          <p className="text-2xl font-bold text-green-600">8</p>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900">Co-inventors</h3>
          <p className="text-2xl font-bold text-purple-600">24</p>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900">Projects</h3>
          <p className="text-2xl font-bold text-orange-600">6</p>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm max-w-6xl mt-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-700">New patent application submitted</span>
            <span className="ml-auto text-xs text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-700">Ticket #1234 resolved</span>
            <span className="ml-auto text-xs text-gray-500">1 day ago</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
            <span className="text-sm text-gray-700">New co-inventor added to project</span>
            <span className="ml-auto text-xs text-gray-500">3 days ago</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
