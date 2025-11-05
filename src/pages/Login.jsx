import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { authService } from "../services/index";
import { useState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const notify = useNotification();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await authService.login({ email, password });

      // Store tokens
      localStorage.setItem("User", JSON.stringify(res?.data?.user));
      localStorage.setItem("accessToken", res?.data?.accessToken);
      localStorage.setItem("refreshToken", res?.data?.refreshToken);

      notify("Login Successful!", "success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (err) {
      notify("Invalid credentials. Please check your email and password.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#101828]">
      {/* {notification.visible && <Notification message={notification.message} type={notification.type} onClose={() => dispatch({ type: "HIDE" })} />} */}

      <div className="hidden md:flex items-center justify-center bg-[#1e2939] p-6">
        <img src="https://images.unsplash.com/photo-1584601218757-8a412705aaa6?auto=format&fit=crop&q=80&w=1170" />
      </div>

      <div className="flex items-center justify-center p-10 bg-[#101828] text-white">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
          <p className="text-center opacity-70">Login to your Exam Portal</p>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}>
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#1e2939] border border-gray-600 focus:outline-none focus:border-white" placeholder="Enter your email" />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#1e2939] border border-gray-600 focus:outline-none focus:border-white" placeholder="Enter your password" />
            </div>

            {isLoading ? (
              <button className="w-full py-3 rounded-xl bg-white text-black font-semibold flex items-center justify-center space-x-2" disabled>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Logging In...</span>
              </button>
            ) : (
              <button className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 flex items-center justify-center space-x-2">
                <LogIn className="w-5 h-5" />
                <span>Log In</span>
              </button>
            )}
          </form>

          <p className="text-center text-sm opacity-80">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
