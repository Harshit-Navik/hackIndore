import { Link } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaUser, FaClipboardList } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function DashboardSidebar({ userRole }) {
  const { logout } = useContext(AuthContext);

  return (
    <aside className="w-64 bg-white shadow-md hidden md:flex flex-col justify-between">
      <div>
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-600">WeCare</h2>
          <p className="text-gray-500 text-sm">{userRole} Portal</p>
        </div>

        <nav className="p-6 space-y-4">
          <Link to="/" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
            <FaHome /> Dashboard
          </Link>
          <Link to="/profile" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
            <FaUser /> Profile
          </Link>
          <Link to="/reports" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
            <FaClipboardList /> Reports
          </Link>
        </nav>
      </div>

      <div className="p-6 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
}
