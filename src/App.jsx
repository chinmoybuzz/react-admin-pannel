import { Route, Routes } from "react-router-dom";
import Layout from "../src/components/Layout/Layout";
import { Suspense, lazy } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Roles = lazy(() => import("./pages/Roles"));
const Users = lazy(() => import("./pages/Users"));
const Courses = lazy(() => import("./pages/Courses"));
const Enrollments = lazy(() => import("./pages/Enrollments"));
const Settings = lazy(() => import("./pages/Settings"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Signup"));

function App() {
  return (
    <Suspense fallback={<p className="p-6">Loading...</p>}>
      <Routes>
        {/* Login OUTSIDE layout */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* App Layout Pages */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/enrollments" element={<Enrollments />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
