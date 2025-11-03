// src/components/DeleteModal.jsx
export default function DeleteModal({ open, data, field, onClose, onConfirm }) {
  if (!open) return null;

  return (
    // <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    //   <div className="bg-white p-6 rounded-xl shadow-lg w-80">
    //     <h2 className="font-semibold text-lg mb-4">Confirm Delete</h2>
    //     <p className="text-gray-600 mb-4">Are you sure?</p>

    //     <div className="flex gap-2 justify-end">
    //       <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
    //         Cancel
    //       </button>
    //       <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
    //         Delete
    //       </button>
    //     </div>
    //   </div>
    // </div>
    // new
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold mb-2">Delete {field}?</h3>
        <p className="mb-4">
          Delete <b>{data?.name}</b>?
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-3 py-1 bg-red-600 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
