import { useState, useEffect } from "react";

export default function UserForm({ initialData, onSubmit, onCancel }) {
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

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("role", form.role);
    fd.append("status", form.status);
    if (form.image) fd.append("image", form.image); // only send if changed

    onSubmit(fd);
  };

  return (
    <div className="space-y-3">
      {/* Image preview */}
      <div className="flex flex-col items-center mb-2">
        <img src={form.preview || "/placeholder-avatar.png"} className="w-20 h-20 rounded-full object-cover" />

        <input type="file" className="mt-2 text-sm" onChange={handleImage} />
      </div>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" />

      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />

      <select name="role" value={form.role} onChange={handleChange} className="w-full border p-2 rounded">
        <option>User</option>
        <option>Admin</option>
      </select>

      <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded">
        <option>Active</option>
        <option>Pending</option>
        <option>Inactive</option>
      </select>

      <div className="flex justify-between pt-2">
        <button onClick={onCancel} className="px-3 py-1 border rounded">
          Cancel
        </button>

        <button onClick={handleSubmit} className="px-3 py-1 bg-blue-600 text-white rounded">
          Save
        </button>
      </div>
    </div>
  );
}
