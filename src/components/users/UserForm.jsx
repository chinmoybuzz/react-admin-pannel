import { useState, useEffect, useRef } from "react";
import { Plus, Camera } from "lucide-react"; // icon library

export default function UserForm({ initialData, onSubmit, onCancel }) {
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
    image: null,
    preview: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        preview: initialData.image,
        image: null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({
      ...form,
      image: file,
      preview: file ? URL.createObjectURL(file) : form.preview,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("role", form.role);
    fd.append("status", form.status);

    if (form.image) {
      fd.append("image", form.image);
    }

    // // ✅ Correct way to debug FormData
    // for (let [key, value] of fd.entries()) {
    //   console.log(key, value);
    // }

    onSubmit(fd);
  };

  return (
    <div className="space-y-4">
      {/* Avatar Upload */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative group cursor-pointer" onClick={() => fileRef.current.click()}>
          <img src={form.preview || "/placeholder-avatar.png"} className="w-24 h-24 rounded-full object-cover border shadow-sm" />

          {/* Upload overlay on hover */}
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <Camera className="text-white w-6 h-6" />
          </div>
        </div>

        {/* Hidden File Input */}
        <input ref={fileRef} type="file" className="hidden" onChange={handleImage} />

        <p className="text-xs text-gray-500">Click image to upload</p>
      </div>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white" />

      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white" />

      <select name="role" value={form.role} onChange={handleChange} className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white">
        <option>User</option>
        <option>Admin</option>
      </select>

      <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white">
        <option>Active</option>
        <option>Pending</option>
        <option>Inactive</option>
      </select>

      <div className="flex justify-between pt-2">
        <button onClick={onCancel} className="px-3 py-2 border rounded dark:border-gray-600">
          Cancel
        </button>

        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
          Save
        </button>
      </div>
    </div>
  );
}
