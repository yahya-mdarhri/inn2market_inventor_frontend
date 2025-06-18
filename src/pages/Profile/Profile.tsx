import React from 'react';

const Profile: React.FC = () => {
  const mockUser = {
    name: "John Doe",
    email: "John@uir.ac.ma",
    role: "Administrator",
    department: "Innovation and Entrepreneurship",
    joinedDate: "January 15, 2020",
  };
  return (
     <div className="page fixed bg-black">
      <div>
        <h1 className="text-3xl font-bold text-gray-100 flex items-center gap-2">
          User Profile
        </h1>
        <p className="text-gray-200">Manage your personal information and settings</p>
      </div>

      <div className="rounded-lg border bg-white shadow-sm max-w-7xl mt-6">
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Profile Details</h2>
            <div className="flex gap-3">
              <button
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                onClick={() => alert("Edit profile functionality not implemented.")}
              >
                Edit Profile
              </button>
              <button
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                onClick={() => alert("Change password functionality not implemented.")}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
        <div className="divide-y">
          {[
            { label: "Name", value: mockUser.name },
            { label: "Email", value: mockUser.email },
            { label: "Role", value: mockUser.role },
            { label: "Department", value: mockUser.department },
            { label: "Joined", value: mockUser.joinedDate },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{item.label}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-gray-600">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Profile;