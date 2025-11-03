import React, { useEffect, useState } from "react";
import { userService } from "../services";
import DeleteModal from "../components/common/DeleteModal";
import UserForm from "../components/users/UserForm";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Add Form State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
    image: null,
  });

  // ✅ Edit Form State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  // ✅ Delete Modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUsers = async () => {
    const data = await userService.userList();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const sorted = [...filtered].sort((a, b) => {
    const x = a[sortField].toLowerCase();
    const y = b[sortField].toLowerCase();
    if (x < y) return sortOrder === "asc" ? -1 : 1;
    if (x > y) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const usersPerPage = 5;
  const totalPages = Math.ceil(sorted.length / usersPerPage);
  const currentUsers = sorted.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // ✅ CREATE USER
  const handleAddUser = async () => {
    const fd = new FormData();
    fd.append("name", newUser.name);
    fd.append("email", newUser.email);
    fd.append("role", newUser.role);
    fd.append("status", newUser.status);
    if (newUser.image) fd.append("image", newUser.image);

    await userService.createUser(fd);
    setIsAddOpen(false);
    setNewUser({ name: "", email: "", role: "User", status: "Active", image: null });
    loadUsers();
  };

  // ✅ Add/Edit Submit
  const handleSubmit = async (formData) => {
    if (editingUser) {
      await userService.update(editingUser.id, formData);
    } else {
      await userService.create(formData);
    }
    setOpenForm(false);
    setEditingUser(null);
    loadUsers();
  };

  // ✅ DELETE
  const handleDelete = async () => {
    await userService.deleteUser(selectedUser.id);
    setDeleteModal(false);
    loadUsers();
  };

  // ✅ EDIT
  const handleUpdate = async () => {
    await userService.updateUser(editUserData.id, editUserData);
    setIsEditOpen(false);
    loadUsers();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Users</h2>

        <button onClick={() => setIsAddOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">
          + Add User
        </button>
      </div>

      <input
        type="text"
        placeholder="Search users..."
        className="mb-4 p-2 border rounded w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase">
            <tr>
              <th onClick={() => handleSort("name")} className="py-3 px-4 cursor-pointer">
                Name ⬍
              </th>
              <th onClick={() => handleSort("email")} className="py-3 px-4 cursor-pointer">
                Email ⬍
              </th>
              <th className="py-3 px-4">Role</th>
              <th onClick={() => handleSort("status")} className="py-3 px-4 cursor-pointer">
                Status ⬍
              </th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="py-3 px-4 flex gap-2 items-center">
                  <img src={user.image} className="w-8 h-8 rounded-full" />
                  <span>{user.name}</span>
                </td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${user.status === "Active" ? "bg-green-200 text-green-800" : user.status === "Pending" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800"}`}>{user.status}</span>
                </td>
                <td className="py-3 text-center">
                  <button
                    onClick={() => {
                      setEditUserData(user);
                      setIsEditOpen(true);
                    }}
                    className="text-blue-600 mr-3">
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setDeleteModal(true);
                    }}
                    className="text-red-600">
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
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="px-3 py-1 border rounded">
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}>
            {i + 1}
          </button>
        ))}

        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="px-3 py-1 border rounded">
          Next
        </button>
      </div>

      {/* ✅ Delete Modal */}
      {deleteModal && <DeleteModal open={true} data={selectedUser} field="User" onClose={() => setDeleteModal(false)} onConfirm={handleDelete} />}

      {/* ✅ Add User Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 w-96 rounded shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Add User</h2>

            <UserForm
              onSubmit={async (fd) => {
                await userService.createUser(fd);
                setIsAddOpen(false);
                loadUsers();
              }}
              onCancel={() => setIsAddOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ✅ Edit Sidebar */}
      {isEditOpen && editUserData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 w-96 rounded shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Add User</h2>

            <UserForm
              initialData={editUserData}
              onSubmit={async (fd) => {
                await userService.updateUser(editUserData.id, fd);
                setIsEditOpen(false);
                loadUsers();
              }}
              onCancel={() => setIsEditOpen(false)}
            />
          </div>
        </div>
        // <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
        //   <div className="bg-white dark:bg-gray-900 w-80 p-6 shadow-xl border-l">
        //     <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        //     <UserForm
        //       initialData={editUserData}
        //       onSubmit={async (fd) => {
        //         await userService.updateUser(editUserData.id, fd);
        //         setIsEditOpen(false);
        //         loadUsers();
        //       }}
        //       onCancel={() => setIsEditOpen(false)}
        //     />
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default Users;
