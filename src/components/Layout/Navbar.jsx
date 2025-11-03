import { useEffect, useRef, useState } from "react";
import { Sun, Moon, Bell } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Toggle dark mode
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
    console.log("theme mode", dark);
  };

  return (
    <header className="w-full bg-white dark:bg-gray-800 p-4 shadow flex justify-end items-center">
      {/* <h2 className="font-semibold text-lg dark:text-white">Dashboard</h2> */}

      <div className="flex items-center gap-4" ref={menuRef}>
        {/* Notifications */}
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <Bell size={20} className="dark:text-white" />
        </button>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          {dark ? <Sun size={20} className="dark:text-white" /> : <Moon size={20} />}
        </button>

        {/* Profile */}
        <img src="https://i.pravatar.cc/40" alt="profile" className="w-10 h-10 rounded-full cursor-pointer border" onClick={() => setOpen((prev) => !prev)} />

        {/* Dropdown */}
        {open && (
          <div className="absolute top-24 right-4 bg-white dark:bg-gray-700 shadow-lg rounded-lg py-2 w-44 border border-gray-200 dark:border-gray-600">
            <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
              Your profile
            </a>
            <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
              Settings
            </a>
            <button className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Sign out</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
