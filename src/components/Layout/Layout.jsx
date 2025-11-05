import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 p-6  dark:bg-gray-900 min-h-screen transition-colors">
        <Navbar />

        <main className="p-6 flex-1 text-gray-900 dark:text-gray-100 transition-colors">
          {/* {children} */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";

// const Layout = ({ children }) => {
//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
//         <Navbar />

//         <main className="p-6 flex-1 text-gray-900 dark:text-gray-100 transition-colors">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
