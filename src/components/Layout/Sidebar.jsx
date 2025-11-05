import { Home, Users, Settings, Book } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200
     ${isActive ? "bg-blue-500 text-white" : "text-white hover:bg-gray-200 hover:text-black"}`;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 min-h-screen p-5 transition-colors">
      <h2 className="text-2xl font-bold mb-8">Exam portal</h2>

      <nav className="flex flex-col space-y-2">
        <NavLink to="/" className={linkClasses}>
          <Home size={20} /> Dashboard
        </NavLink>

        <NavLink to="/users" className={linkClasses}>
          <Users size={20} /> Users
        </NavLink>
        <NavLink to="/courses" className={linkClasses}>
          <Book size={20} /> Courses
        </NavLink>
        <NavLink to="/enrollments" className={linkClasses}>
          <Book size={20} /> Enrollments
        </NavLink>

        <NavLink to="/roles" className={linkClasses}>
          <Settings size={20} /> Role
        </NavLink>
        <NavLink to="/settings" className={linkClasses}>
          <Settings size={20} /> Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
