import Navbar from "../components/Navbar";
import DashboardSidebar from "../components/DashboardSidebar";
import {
  FaHeartbeat,
  FaWalking,
  FaWeight,
  FaPills,
  FaBell,
  FaFileMedical,
  FaAppleAlt,
  FaTint,
  FaRunning,
  FaStethoscope,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";

export default function PatientDashboard() {
  // --- Chart and data ---
  const healthProgress = [
    { week: "Week 1", BP: 120, Sugar: 90 },
    { week: "Week 2", BP: 118, Sugar: 95 },
    { week: "Week 3", BP: 122, Sugar: 88 },
    { week: "Week 4", BP: 117, Sugar: 85 },
    { week: "Week 5", BP: 115, Sugar: 80 },
    { week: "Week 6", BP: 112, Sugar: 82 },
  ];

  const dailySteps = [
    { day: "Mon", steps: 4200 },
    { day: "Tue", steps: 5000 },
    { day: "Wed", steps: 6300 },
    { day: "Thu", steps: 5400 },
    { day: "Fri", steps: 7200 },
    { day: "Sat", steps: 6900 },
    { day: "Sun", steps: 8100 },
  ];

  const appointments = [
    { doctor: "Dr. Sneha Kapoor", date: "Nov 25, 2025", status: "Upcoming" },
    { doctor: "Dr. Aryan Mehta", date: "Nov 22, 2025", status: "Completed" },
    { doctor: "Dr. Ritu Sharma", date: "Nov 15, 2025", status: "Cancelled" },
  ];

  const prescriptions = [
    { name: "Metformin 500mg", dosage: "Twice daily", date: "Nov 21, 2025" },
    { name: "Amlodipine 5mg", dosage: "Once daily", date: "Nov 18, 2025" },
    { name: "Vitamin D3", dosage: "Weekly", date: "Nov 17, 2025" },
  ];

  const reports = [
    { title: "Blood Test", date: "Nov 15, 2025", file: "blood-test.pdf" },
    { title: "ECG Report", date: "Nov 10, 2025", file: "ecg.pdf" },
    { title: "X-Ray Chest", date: "Nov 05, 2025", file: "xray.pdf" },
  ];

  const reminders = [
    "Drink 3L of water today 💧",
    "Walk at least 6,000 steps 🚶",
    "Take BP medicine at 9:00 AM 💊",
    "Avoid junk food 🍔",
    "Sleep by 10:30 PM 😴",
  ];

  const healthGoals = [
    { goal: "Lose 3kg in 30 days", progress: 60 },
    { goal: "Run 5km without breaks", progress: 40 },
    { goal: "Maintain sugar under 100 mg/dL", progress: 80 },
  ];

  // --- Layout ---
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* ✅ Navbar always stays on top */}
      <Navbar />

      {/* ✅ Sidebar + Main Content section below navbar */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:w-64 w-full bg-white border-r shadow-sm">
          <DashboardSidebar userRole="patient" />
        </div>

        {/* Main Dashboard Content */}
        <div className="flex-1 flex flex-col">
          {/* --- Stats Cards --- */}
          <main className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: "Blood Pressure",
                value: "118/78",
                icon: <FaHeartbeat className="text-red-600 text-3xl" />,
                color: "bg-red-100",
              },
              {
                title: "Blood Sugar",
                value: "92 mg/dL",
                icon: <FaTint className="text-green-600 text-3xl" />,
                color: "bg-green-100",
              },
              {
                title: "BMI",
                value: "22.4",
                icon: <FaWeight className="text-blue-600 text-3xl" />,
                color: "bg-blue-100",
              },
              {
                title: "Daily Steps",
                value: "7,200",
                icon: <FaWalking className="text-yellow-600 text-3xl" />,
                color: "bg-yellow-100",
              },
              {
                title: "Calories Burned",
                value: "1,560 kcal",
                icon: <FaRunning className="text-orange-500 text-3xl" />,
                color: "bg-orange-100",
              },
              {
                title: "Consultations",
                value: "12",
                icon: <FaStethoscope className="text-purple-600 text-3xl" />,
                color: "bg-purple-100",
              },
              {
                title: "Water Intake",
                value: "2.8L",
                icon: <FaTint className="text-cyan-600 text-3xl" />,
                color: "bg-cyan-100",
              },
              {
                title: "Healthy Meals",
                value: "5/6",
                icon: <FaAppleAlt className="text-lime-600 text-3xl" />,
                color: "bg-lime-100",
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`p-5 rounded-xl shadow-sm ${card.color} flex items-center gap-4 hover:shadow-md transition`}
              >
                {card.icon}
                <div>
                  <p className="text-gray-600 text-sm sm:text-base font-medium">
                    {card.title}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">
                    {card.value}
                  </p>
                </div>
              </div>
            ))}
          </main>

          {/* --- Charts --- */}
          <section className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
                Weekly Health Progress
              </h2>
              <div className="w-full h-[300px] min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthProgress}>
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="BP"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      name="Blood Pressure"
                    />
                    <Line
                      type="monotone"
                      dataKey="Sugar"
                      stroke="#EF4444"
                      strokeWidth={3}
                      name="Blood Sugar"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
                Steps This Week
              </h2>
              <div className="w-full h-[300px] min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailySteps}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="steps" fill="#10B981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* --- Appointments + Prescriptions --- */}
          <section className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
                Appointments
              </h2>
              <ul className="space-y-3">
                {appointments.map((a, i) => (
                  <li
                    key={i}
                    className="flex justify-between p-3 bg-gray-50 rounded-md border-l-4 border-blue-500"
                  >
                    <div>
                      <p className="font-semibold">{a.doctor}</p>
                      <p className="text-sm text-gray-500">{a.date}</p>
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        a.status === "Upcoming"
                          ? "text-blue-600"
                          : a.status === "Completed"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {a.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
                Prescriptions
              </h2>
              <ul className="space-y-3">
                {prescriptions.map((p, i) => (
                  <li
                    key={i}
                    className="flex justify-between p-3 bg-gray-50 rounded-md border-l-4 border-green-500"
                  >
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-gray-500">{p.dosage}</p>
                    </div>
                    <p className="text-sm text-gray-500">{p.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* --- Reports + Goals --- */}
          <section className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
                Medical Reports
              </h2>
              <ul className="space-y-3">
                {reports.map((r, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-md border-l-4 border-purple-500"
                  >
                    <div>
                      <p className="font-semibold">{r.title}</p>
                      <p className="text-sm text-gray-500">{r.date}</p>
                    </div>
                    <button className="text-blue-600 hover:underline text-sm">
                      View
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
                Health Goals
              </h2>
              <ul className="space-y-3">
                {healthGoals.map((g, i) => (
                  <li
                    key={i}
                    className="p-3 bg-gray-50 rounded-md border-l-4 border-teal-500"
                  >
                    <p className="font-semibold">{g.goal}</p>
                    <div className="w-full bg-gray-200 h-2 rounded mt-2">
                      <div
                        className="bg-teal-500 h-2 rounded"
                        style={{ width: `${g.progress}%` }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* --- Reminders --- */}
          <section className="p-4 sm:p-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
                Daily Health Reminders
              </h2>
              <ul className="space-y-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {reminders.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 p-3 bg-yellow-50 rounded-md border-l-4 border-yellow-400"
                  >
                    <FaBell className="text-yellow-500" />
                    <span className="text-gray-700 text-sm sm:text-base">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
