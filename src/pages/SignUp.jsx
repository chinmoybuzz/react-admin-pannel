import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#101828] text-white px-5">
      <div className="bg-[#1e2939] p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center">Create Account</h2>
        <p className="text-sm text-center opacity-60">Register for Exam Portal</p>

        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-[#101828] border border-gray-600 focus:border-white focus:outline-none" />

          <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-[#101828] border border-gray-600 focus:border-white focus:outline-none" />

          <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl bg-[#101828] border border-gray-600 focus:border-white focus:outline-none" />

          <button className="w-full py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition">Sign Up</button>
        </form>

        <p className="text-center text-sm opacity-80">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
