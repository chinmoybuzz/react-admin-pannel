import { AlertTriangle } from "lucide-react";

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  const isSuccess = type === "success";
  const bgColor = isSuccess ? "bg-green-600" : "bg-red-600";

  return (
    <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-md p-4 rounded-xl ${bgColor} text-white shadow-xl flex items-center space-x-3 z-50`}>
      <AlertTriangle className="h-6 w-6" />
      <p className="font-medium grow">{message}</p>
      <button onClick={onClose} className="text-xl">
        &times;
      </button>
    </div>
  );
};

export default Notification;
