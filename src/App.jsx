import { Route, Routes } from "react-router-dom";
import Layout from "../src/components/Layout/Layout";
import { Suspense, lazy } from "react";

function App() {
  const Dashboard = lazy(() => import("./pages/dashboard.jsx"));
  const Roles = lazy(() => import("./pages/roles.jsx"));
  const Users = lazy(() => import("./pages/users.jsx"));
  const Settings = lazy(() => import("./pages/settings.jsx"));
  const Login = lazy(() => import("./pages/login.jsx"));
  const SignUp = lazy(() => import("./pages/signup.jsx"));

  return (
    <Suspense fallback={<p className="p-6">Loading...</p>}>
      <Routes>
        {/* Login OUTSIDE layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />

        {/* App Layout Pages */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
