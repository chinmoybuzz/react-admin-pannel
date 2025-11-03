import { Users, DollarSign, TrendingUp, ShoppingBag } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Dashboard</h1>
      {/* <p>Welcome to your dashboard 👋</p> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="total Users" value="12,14" icon={<Users size={24} className="text-green-600 dark:text-green-400" />} />
        <StatCard title="Revenue" value="$54,300" icon={<DollarSign size={24} className="text-green-600 dark:text-green-400" />} />

        <StatCard title="Growth" value="34%" icon={<TrendingUp size={24} className="text-purple-600 dark:text-purple-400" />} />

        <StatCard title="Orders" value="1,240" icon={<ShoppingBag size={24} className="text-orange-600 dark:text-orange-400" />} />
      </div>
    </div>
  );
};

export default Dashboard;
