import React, { useState } from "react";

// Fake data
const userRole = [
  { id: 1, name: "User", role: "User", status: "Active" },
  { id: 2, name: "Admin", role: "Admin", status: "Inactive" },
  { id: 3, name: "Moderator", role: "Moderator", status: "Pending" },
];

const Roles = () => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("role");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  const filtered = userRole.filter((u) => u.role.toLowerCase().includes(search.toLowerCase()));

  const sorted = [...filtered].sort((a, b) => {
    const x = a[sortField].toLowerCase();
    const y = b[sortField].toLowerCase();
    if (x < y) return sortOrder === "asc" ? -1 : 1;
    if (x > y) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const usersPerPage = 10;
  const totalPages = Math.ceil(sorted.length / usersPerPage);
  const currentUsers = sorted.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const openEdit = (user) => {
    setEditUserData(user);
    setIsEditOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Users</h2>

      <input
        type="text"
        placeholder="Search..."
        className="mb-4 p-2 border rounded w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-gray-700 uppercase">
            <tr>
              <th onClick={() => handleSort("name")} className="py-3 px-4 cursor-pointer">
                Name ⬍
              </th>
              <th onClick={() => handleSort("email")} className="py-3 px-4 cursor-pointer">
                Role ⬍
              </th>
              <th onClick={() => handleSort("status")} className="py-3 px-4 cursor-pointer">
                Status ⬍
              </th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                {/* Name + Email */}
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-800 dark:text-gray-200">{user.name}</div>
                </td>

                {/* Role */}
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{user.role}</td>

                {/* Status */}
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs
            ${user.status === "Active" ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300" : user.status === "Pending" ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300" : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"}
          `}>
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 text-center">
                  <button onClick={() => openEdit(user)} className="text-blue-600 dark:text-blue-400 hover:underline mr-3">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user)} className="text-red-600 dark:text-red-400 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="px-3 py-1 border rounded dark:border-gray-700 dark:text-white">
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded dark:border-gray-700 dark:text-white
              ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}>
            {i + 1}
          </button>
        ))}

        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="px-3 py-1 border rounded dark:border-gray-700 dark:text-white">
          Next
        </button>
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Delete User?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Delete <b>{selectedUser?.name}</b>?
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteModal(false)} className="px-3 py-1 border rounded dark:border-gray-600 dark:text-white">
                Cancel
              </button>
              <button onClick={() => setDeleteModal(false)} className="px-3 py-1 bg-red-600 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Sidebar */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-end">
          <div className="bg-white dark:bg-gray-900 w-80 p-6 shadow-xl h-full border-l dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Edit Role</h2>

            <input type="text" value={editUserData?.name} onChange={(e) => setEditUserData({ ...editUserData, name: e.target.value })} className="w-full border p-2 mb-3 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" />

            <input type="text" value={editUserData?.role} onChange={(e) => setEditUserData({ ...editUserData, role: e.target.value })} className="w-full border p-2 mb-3 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" />

            <div className="flex justify-between mt-3">
              <button onClick={() => setIsEditOpen(false)} className="px-3 py-1 border rounded dark:border-gray-600 dark:text-white">
                Cancel
              </button>
              <button onClick={() => setIsEditOpen(false)} className="px-3 py-1 bg-blue-600 text-white rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
