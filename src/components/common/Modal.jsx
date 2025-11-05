export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <button className="float-right text-gray-600" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
