import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#101828]">
      {/* Left section with big image */}
      <div className="hidden md:flex items-center justify-center bg-[#1e2939] p-6">
        <img src="https://images.unsplash.com/photo-1584601218757-8a412705aaa6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" />
      </div>

      {/* Right section login form */}
      <div className="flex items-center justify-center p-10 bg-[#101828] text-white">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center">Welcome BackK</h2>
          <p className="text-center opacity-70">Login to your Exam Portal</p>

          <form className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl bg-[#1e2939] border border-gray-600 focus:outline-none focus:border-white transition" placeholder="Enter your email" />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input type="password" className="w-full px-4 py-3 rounded-xl bg-[#1e2939] border border-gray-600 focus:outline-none focus:border-white transition" placeholder="Enter your password" />
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition shadow-md">
              Login
            </button>
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
