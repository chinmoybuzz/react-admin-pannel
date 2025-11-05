import { Route, Routes } from "react-router-dom";
import Layout from "../src/components/Layout/Layout";
import { Suspense, lazy } from "react";

function App() {
  const Dashboard = lazy(() => import("./pages/dashboard"));
  const Roles = lazy(() => import("./pages/roles"));
  const Users = lazy(() => import("./pages/users"));
  const Settings = lazy(() => import("./pages/settings"));
  const Login = lazy(() => import("./pages/login"));
  const SignUp = lazy(() => import("./pages/signup"));

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
