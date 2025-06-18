export default function PatentsPage() {
  return (
    <div className="page  fixed">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Patents</h1>
        <p className="text-gray-100">Track your patent applications and intellectual property</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 max-w-6xl mt-6">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Patent Portfolio</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Filed</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Approved</span>
              <span className="font-medium">5</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm max-w-6xl">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Applications</h3>
          <div className="space-y-3">
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="font-medium text-gray-900">Smart IoT Sensor System</p>
              <p className="text-sm text-gray-600">Filed: March 15, 2024</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="font-medium text-gray-900">AI-Powered Analytics Platform</p>
              <p className="text-sm text-gray-600">Filed: February 28, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
