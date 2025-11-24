import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSidebar from "../components/DashboardSidebar";
import {
  FaUserMd,
  FaCalendarAlt,
  FaNotesMedical,
  FaExclamationTriangle,
  FaMoneyBillWave,
  FaUserInjured,
  FaChartLine,
  FaUserCheck,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
} from "recharts";

export default function DoctorDashboard() {
  // Charts data
  const patientTrends = [
    { month: "Jan", patients: 22 },
    { month: "Feb", patients: 31 },
    { month: "Mar", patients: 45 },
    { month: "Apr", patients: 52 },
    { month: "May", patients: 60 },
    { month: "Jun", patients: 75 },
    { month: "Jul", patients: 82 },
  ];

  const revenueData = [
    { month: "Jan", amount: 22000 },
    { month: "Feb", amount: 30000 },
    { month: "Mar", amount: 45000 },
    { month: "Apr", amount: 52000 },
    { month: "May", amount: 60000 },
    { month: "Jun", amount: 75000 },
  ];

  const appointmentStatus = [
    { name: "Completed", value: 54 },
    { name: "Upcoming", value: 30 },
    { name: "Cancelled", value: 10 },
  ];

  const barData = [
    { day: "Mon", appointments: 8 },
    { day: "Tue", appointments: 12 },
    { day: "Wed", appointments: 9 },
    { day: "Thu", appointments: 15 },
    { day: "Fri", appointments: 11 },
    { day: "Sat", appointments: 6 },
  ];

  const COLORS = ["#22C55E", "#3B82F6", "#EF4444"];

  const recentPatients = [
    { name: "Ravi Sharma", condition: "Diabetes", status: "Stable" },
    { name: "Aditi Mehta", condition: "Asthma", status: "Under Observation" },
    { name: "John Doe", condition: "Hypertension", status: "Critical" },
    { name: "Suresh Kumar", condition: "Anemia", status: "Stable" },
    { name: "Priya Verma", condition: "Heart Disease", status: "Critical" },
    { name: "Neha Singh", condition: "Thyroid", status: "Stable" },
  ];

  const alerts = [
    "3 critical patients need immediate attention ⚠️",
    "Upcoming surgery scheduled for 4 PM",
    "2 reports pending for approval",
    "Equipment maintenance due tomorrow",
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar (hidden on small screens) */}
      <div className="hidden md:block">
        <DashboardSidebar userRole="doctor" />
      </div>

      <div className="flex-1 flex flex-col w-full">
        <DashboardNavbar title="Doctor Dashboard" />

        {/* --- Top Stats Cards --- */}
        <main className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              title: "Total Patients",
              value: "162",
              icon: <FaUserMd className="text-blue-600 text-3xl" />,
              color: "bg-blue-100",
            },
            {
              title: "Appointments Today",
              value: "18",
              icon: <FaCalendarAlt className="text-green-600 text-3xl" />,
              color: "bg-green-100",
            },
            {
              title: "Reports Pending",
              value: "5",
              icon: <FaNotesMedical className="text-purple-600 text-3xl" />,
              color: "bg-purple-100",
            },
            {
              title: "Critical Alerts",
              value: "3",
              icon: <FaExclamationTriangle className="text-red-600 text-3xl" />,
              color: "bg-red-100",
            },
            {
              title: "Active Patients",
              value: "126",
              icon: <FaUserInjured className="text-orange-500 text-3xl" />,
              color: "bg-orange-100",
            },
            {
              title: "Recovered",
              value: "42",
              icon: <FaUserCheck className="text-green-700 text-3xl" />,
              color: "bg-green-50",
            },
            {
              title: "Monthly Revenue",
              value: "₹75,000",
              icon: <FaMoneyBillWave className="text-emerald-600 text-3xl" />,
              color: "bg-emerald-100",
            },
            {
              title: "Weekly Growth",
              value: "+8.4%",
              icon: <FaChartLine className="text-indigo-600 text-3xl" />,
              color: "bg-indigo-100",
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

        {/* --- Charts Section --- */}
        <section className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md lg:col-span-2">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
              Patients Growth Trend
            </h2>
            <div  className="w-full h-[300px] min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <LineChart data={patientTrends}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="patients"
                    stroke="#3B82F6"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
              Appointment Status
            </h2>
            <div  className="w-full h-[300px] min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <PieChart>
                  <Pie
                    data={appointmentStatus}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {appointmentStatus.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* --- Revenue Chart + Alerts --- */}
        <section className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md lg:col-span-2">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
              Monthly Revenue Overview
            </h2>
            <div  className="w-full h-[300px] min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
              Recent Alerts
            </h2>
            <ul className="space-y-3 overflow-auto max-h-[300px]">
              {alerts.map((alert, i) => (
                <li
                  key={i}
                  className="p-3 bg-red-50 text-sm text-red-700 border-l-4 border-red-500 rounded-md"
                >
                  {alert}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- Patients Table --- */}
        <section className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
            Recent Patients
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 sm:p-4 text-left">Name</th>
                  <th className="p-3 sm:p-4 text-left">Condition</th>
                  <th className="p-3 sm:p-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((p, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3 sm:p-4">{p.name}</td>
                    <td className="p-3 sm:p-4">{p.condition}</td>
                    <td
                      className={`p-3 sm:p-4 font-semibold ${
                        p.status === "Critical"
                          ? "text-red-600"
                          : p.status === "Under Observation"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {p.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
