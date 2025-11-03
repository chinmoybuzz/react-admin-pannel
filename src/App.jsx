// import './App.css'
import { Route, Routes } from "react-router-dom";
import Layout from "../src/components/Layout/Layout";
import { Suspense, lazy } from "react";
import Roles from "./pages/Roles";

function App() {
  // Lazy pages (code splitting)
  const Dashboard = lazy(() => import("./pages/Dashboard"));
  const Users = lazy(() => import("./pages/Users"));
  const Settings = lazy(() => import("./pages/Settings"));
  return (
    <Layout>
      <Suspense fallback={<p className="p-6">Loading...</p>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
      {/* <Users /> */}
    </Layout>
  );
}

export default App;
