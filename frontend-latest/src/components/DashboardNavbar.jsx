import { FaBell, FaUserCircle } from "react-icons/fa";

export default function DashboardNavbar({ title }) {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-5 text-gray-600">
        <FaBell className="text-xl cursor-pointer hover:text-blue-600 transition" />
        <FaUserCircle className="text-3xl cursor-pointer hover:text-blue-600 transition" />
      </div>
    </header>
  );
}
