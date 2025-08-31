"use client";
import React, { useState } from "react";
import { IUser } from "@/models/User"; // ✅ Use the model interface directly
import { Search, Eye } from "lucide-react";

const mockUsers: IUser[] = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    oauthProvider: "google",
    mobile: "9876543210",
    address: "123 Main Street, NY",
    createdAt: new Date(),
  } as IUser,
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    oauthProvider: "local",
    mobile: "9871234567",
    address: "456 Elm Road, CA",
    createdAt: new Date(),
  } as IUser,
];

const AllUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Users</h1>

        {/* Search Bar */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition-all"
          >
            <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500 capitalize">
              {user.oauthProvider}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-400">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => setSelectedUser(user)}
                className="flex items-center gap-1 text-green-600 hover:text-green-800 text-sm font-medium"
              >
                <Eye size={16} /> View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setSelectedUser(null)}
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">{selectedUser.name}</h2>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Mobile:</strong> {selectedUser.mobile}</p>
            <p><strong>Provider:</strong> {selectedUser.oauthProvider}</p>
            {selectedUser.address && (
              <p><strong>Address:</strong> {selectedUser.address}</p>
            )}
            <p>
              <strong>Joined:</strong>{" "}
              {new Date(selectedUser.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
