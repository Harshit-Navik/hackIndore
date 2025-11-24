import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/api";
import { useSpeechToText } from "../utils/useSpeechToText";
import { FaMicrophone } from "react-icons/fa";


export default function Auth() {
  const [role, setRole] = useState("doctor");
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const [voiceField, setVoiceField] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Check URL params to switch mode
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");
    setIsLogin(mode !== "signup");
  }, [location]);

  // ✅ Speech input hook
  const { startListening } = useSpeechToText((text) => {
    if (voiceField) {
      setForm((prev) => ({ ...prev, [voiceField]: text }));
      setVoiceField(null);
    }
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleVoice = (field) => {
    setVoiceField(field);
    startListening();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post(`${BASE_URL}/auth/login`, {
          phone: form.phone,
          password: form.password,
        });

        // ✅ Save user + token both
        login(res.data.token, res.data.user);

        // ✅ Navigate after context update
        setTimeout(() => {
          navigate(
            res.data.user.role === "doctor"
              ? "/doctor-dashboard"
              : "/patient-dashboard"
          );
        }, 200);
      } else {
        const res = await axios.post(`${BASE_URL}/auth/register`, { ...form, role });

        // ✅ Register also logs in
        login(res.data.token, res.data.user);

        setTimeout(() => {
          navigate(
            res.data.user.role === "doctor"
              ? "/doctor-dashboard"
              : "/patient-dashboard"
          );
        }, 200);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred.");
    }
  };


  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div
        className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden"
        style={{
          minHeight: "650px", // ✅ fixed height (no shrinking)
          transition: "all 0.4s ease-in-out",
        }}
      >
        {/* ✅ Left Side: Static Image */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src={role === "doctor" ? "./doctor.jpg" : "./patient.jpg"}
            alt="Portal"
            className="absolute inset-0 w-full h-full object-cover"
            />

          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-8 text-center">
            <h1 className="text-3xl font-semibold mb-2">
              {role === "doctor" ? "Doctor Portal" : "Patient Portal"}
            </h1>
            <p className="text-sm md:text-base max-w-xs">
              {role === "doctor"
                ? "Access your dashboard and manage patient records securely."
                : "Manage your appointments and health reports easily."}
            </p>
          </div>
        </div>

        {/* ✅ Right Side */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          {/* Role Switch */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setRole("patient")}
              className={`px-5 py-2 rounded-full font-medium transition ${
                role === "patient"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => setRole("doctor")}
              className={`px-5 py-2 rounded-full font-medium transition ${
                role === "doctor"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Doctor
            </button>
          </div>

          {/* Auth Toggle */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => {
                setIsLogin(true);
                navigate("?mode=login", { replace: true }); // ✅ Update URL
              }}
              className={`px-4 py-2 ${
                isLogin ? "border-b-4 border-blue-500 font-semibold" : ""
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                navigate("?mode=signup", { replace: true }); // ✅ Update URL
              }}
              className={`px-4 py-2 ${
                !isLogin ? "border-b-4 border-blue-500 font-semibold" : ""
              }`}
            >
              Sign Up
            </button>
          </div>


          {/* ✅ Fixed-height form container */}
          <div
            className="overflow-hidden flex-1 flex items-center justify-center"
            style={{ minHeight: "380px" }}
          >
            <form
              className="space-y-4 w-full max-w-md transition-all duration-500"
              onSubmit={handleSubmit}
            >
              {!isLogin && (
                <InputWithMic
                  name="fullName"
                  placeholder="Full Name"
                  value={form.fullName || ""}
                  handleChange={handleChange}
                  handleVoice={handleVoice}
                />
              )}

              <InputWithMic
                name="phone"
                placeholder="Phone Number"
                type="tel"
                value={form.phone || ""}
                handleChange={handleChange}
                handleVoice={handleVoice}
                required
              />

              {!isLogin && (
                <InputWithMic
                  name="email"
                  placeholder="Email (optional)"
                  type="email"
                  value={form.email || ""}
                  handleChange={handleChange}
                  handleVoice={handleVoice}
                />
              )}

              <InputWithMic
                name="password"
                placeholder="Password"
                type="password"
                value={form.password || ""}
                handleChange={handleChange}
                handleVoice={handleVoice}
                required
              />

              {!isLogin && role === "doctor" && (
                <InputWithMic
                  name="licenseNumber"
                  placeholder="Medical License Number"
                  value={form.licenseNumber || ""}
                  handleChange={handleChange}
                  handleVoice={handleVoice}
                />
              )}

              {!isLogin && role === "patient" && (
                <InputWithMic
                  name="dob"
                  type="date"
                  value={form.dob || ""}
                  handleChange={handleChange}
                  handleVoice={handleVoice}
                />
              )}

              <button
                type="submit"
                className={`w-full py-3 rounded-lg text-white font-medium transition ${
                  role === "doctor"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isLogin ? "Login" : "Create Account"}
              </button>
            </form>
          </div>

          {message && (
            <p className="text-center mt-4 text-red-500 font-medium">
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ✅ Small helper for reusability */
function InputWithMic({
  name,
  placeholder,
  type = "text",
  value,
  handleChange,
  handleVoice,
  required,
}) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        required={required}
        className="w-full p-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <FaMicrophone
        onClick={() => handleVoice(name)}
        className="absolute right-3 top-3 text-gray-600 cursor-pointer hover:text-blue-500"
      />
    </div>
  );
}
