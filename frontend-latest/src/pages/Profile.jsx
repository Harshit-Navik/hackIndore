import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSidebar from "../components/DashboardSidebar";
import axios from "axios";
import { BASE_URL } from "../api/api";
import { FaUserCircle } from "react-icons/fa";

export default function Profile() {
  const { user, token, login } = useContext(AuthContext);
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    email: user?.email || "",
    dob: user?.dob || "",
    licenseNumber: user?.licenseNumber || "",
  });
  const [profilePic, setProfilePic] = useState(user?.profilePic || null);
  const [preview, setPreview] = useState(user?.profilePic || null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      if (profilePic) formData.append("profilePic", profilePic);

      const res = await axios.put(`${BASE_URL}/auth/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Update context
      login(token, res.data.user);
      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar userRole={user?.role || "doctor"} />

      <div className="flex-1 flex flex-col">
        <DashboardNavbar title="My Profile" />

        <main className="p-8">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Personal Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="flex items-center gap-6">
                <div className="relative w-28 h-28">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="w-28 h-28 object-cover rounded-full border"
                    />
                  ) : (
                    <FaUserCircle className="text-gray-400 text-7xl" />
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">
                    Upload Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="text-sm text-gray-600"
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    disabled
                    className="w-full border p-3 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {user?.role === "patient" && (
                  <div>
                    <label className="block mb-2 text-gray-700 font-medium">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={form.dob}
                      onChange={handleChange}
                      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                )}

                {user?.role === "doctor" && (
                  <div>
                    <label className="block mb-2 text-gray-700 font-medium">
                      Medical License Number
                    </label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={form.licenseNumber}
                      onChange={handleChange}
                      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>

            {message && (
              <p className="text-center mt-4 text-green-600 font-medium">
                {message}
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
