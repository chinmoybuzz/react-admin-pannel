import { motion } from "framer-motion";
import React, { useState } from "react";

const EditUserSidebar = ({ open, onClose, user, onSave }) => {
  if (!open || !user) return null;

  const [form, setForm] = useState(user);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose}></div>

      {/* Sidebar */}
      <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl p-6 z-50">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Edit User</h2>

        <label className="text-sm text-gray-600 dark:text-gray-300">Name</label>
        <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded mb-3 dark:bg-gray-800 dark:border-gray-700" />

        <label className="text-sm text-gray-600 dark:text-gray-300">Email</label>
        <input name="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded mb-3 dark:bg-gray-800 dark:border-gray-700" />

        <label className="text-sm text-gray-600 dark:text-gray-300">Role</label>
        <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 border rounded mb-4 dark:bg-gray-800 dark:border-gray-700">
          <option>Admin</option>
          <option>User</option>
        </select>

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white">
            Cancel
          </button>
          <button onClick={() => onSave(form)} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">
            Save
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default EditUserSidebar;
