const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1 flex items-center gap-4">
      <div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700">{icon}</div>

      <div>
        <p className="text-gray-500 dark:text-gray-300 text-sm">{title}</p>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{value}</h2>
      </div>
    </div>
  );
};

export default StatCard;
