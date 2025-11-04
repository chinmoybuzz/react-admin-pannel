// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { Users, BookOpen, Trophy, Wallet, UserPlus, CalendarDays, TrendingUp, BarChart2 } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { userService } from "../services";
import UserForm from "../components/users/UserForm";

// demo data
const performance = [
  { day: "Mon", exams: 120, avgScore: 68 },
  { day: "Tue", exams: 150, avgScore: 72 },
  { day: "Wed", exams: 140, avgScore: 70 },
  { day: "Thu", exams: 180, avgScore: 75 },
  { day: "Fri", exams: 200, avgScore: 78 },
  { day: "Sat", exams: 170, avgScore: 74 },
  { day: "Sun", exams: 90, avgScore: 65 },
];

const resultData = [
  { name: "Passed", value: 820 },
  { name: "Failed", value: 180 },
];
const pieColors = ["#10B981", "#EF4444"]; // green, red

const stats = [
  { title: "Active Students", value: "4,320", delta: "+3.2%", icon: <Users size={20} className="text-blue-600" />, sparkline: [10, 12, 11, 14, 16, 18, 22] },
  { title: "New Enrollments", value: "860", delta: "+8.1%", icon: <UserPlus size={20} className="text-green-600" />, sparkline: [5, 6, 9, 10, 8, 12, 14] },
  { title: "Total Exams", value: "210", delta: "+1.0%", icon: <BookOpen size={20} className="text-purple-600" />, sparkline: [2, 4, 3, 4, 6, 5, 7] },
  { title: "Avg Score", value: "68%", delta: "-0.4%", icon: <TrendingUp size={20} className="text-orange-500" />, sparkline: [65, 66, 68, 69, 70, 68, 67] },
];

const upcoming = [
  { name: "SSC CGL Mock", date: "2025-02-02", seats: "500" },
  { name: "Bank PO", date: "2025-02-05", seats: "350" },
  { name: "Railway Group D", date: "2025-02-10", seats: "420" },
  { name: "IBPS Clerk", date: "2025-02-15", seats: "380" },
];

const recent = [
  { name: "Amit Sharma", email: "amit@example.com", course: "Banking", status: "Active" },
  { name: "Priya Singh", email: "priya@example.com", course: "SSC", status: "Active" },
  { name: "Ravi Das", email: "ravi@example.com", course: "Railway", status: "Pending" },
  { name: "Neha Roy", email: "neha@example.com", course: "Teaching", status: "Active" },
];

export default function Dashboard() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const totalResults = resultData.reduce((s, r) => s + r.value, 0);
  const passed = resultData.find((r) => r.name === "Passed")?.value ?? 0;
  const passPercent = totalResults ? Math.round((passed / totalResults) * 100) : 0;

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">🎓 Exam Portal Admin</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Insights, activity and quick actions — at a glance.</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setIsAddOpen(true)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow flex items-center gap-2">
            <UserPlus size={16} /> Add Student
          </button>
          <button className="px-3 py-2 border rounded-lg text-sm text-gray-600 dark:text-gray-200">Export</button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <StatCard key={i} title={s.title} value={s.value} delta={s.delta} icon={s.icon} sparkline={s.sparkline} />
        ))}
      </div>

      {/* Charts + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics area (left 2 columns) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow p-6 border dark:border-gray-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <BarChart2 size={18} className="text-indigo-600" /> Exam Activity
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">Last 7 days</div>
          </div>

          {/* Line Chart */}
          <div className="h-56 rounded border p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgScore" stroke="#6366F1" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar + Pie row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Bar */}
            <div className="col-span-2 h-48 rounded border p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="exams" fill="#10B981" barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie (donut) with center text */}
            <div className="h-48 rounded border p-2 relative flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={resultData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={38} outerRadius={60} paddingAngle={4} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {resultData.map((_, idx) => (
                        <Cell key={idx} fill={pieColors[idx % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* centered overlay showing total / pass% */}
              <div className="absolute pointer-events-none flex flex-col items-center">
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-xl font-semibold">{totalResults}</div>
                <div className="text-xs text-gray-500 mt-1">{passPercent}% passed</div>
              </div>
            </div>
          </div>

          {/* mini KPI row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700">
              <div className="text-xs text-gray-500">Avg Time Spent</div>
              <div className="font-medium">45m</div>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700">
              <div className="text-xs text-gray-500">Avg Attempt / Student</div>
              <div className="font-medium">3.2</div>
            </div>
          </div>
        </div>

        {/* Upcoming Exams column */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-5 border dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <CalendarDays className="text-blue-600" /> Upcoming Exams
            </h4>
            <button className="text-sm text-indigo-600">View all</button>
          </div>

          <ul className="space-y-3">
            {upcoming.map((u, i) => (
              <li key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-100">{u.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {u.seats} seats • {u.date}
                  </div>
                </div>
                <div className="text-xs text-indigo-600">Starts</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent users */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 border dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Users className="text-indigo-500" /> Recently Registered
          </h3>
          <div className="text-sm text-gray-500">Showing latest 10</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
              <tr>
                <th className="pb-2">Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {recent.map((r, i) => (
                <tr key={i} className="border-b dark:border-gray-800 last:border-none hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="py-3">{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.course}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${r.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{r.status}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="text-sm text-indigo-600">View</button>
                      <button className="text-sm text-red-600">Block</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 w-96 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add Student</h2>
              <button onClick={() => setIsAddOpen(false)} className="text-gray-500 hover:text-gray-700">
                ✖
              </button>
            </div>

            <UserForm
              onSubmit={async (fd) => {
                await userService.createUser(fd);
                setIsAddOpen(false);
              }}
              onCancel={() => setIsAddOpen(false)}
            />

            <button onClick={() => document.getElementById("user-form-submit")?.click()} className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
              Submit Student
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
