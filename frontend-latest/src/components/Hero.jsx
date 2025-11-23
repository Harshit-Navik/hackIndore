import heroImage from "../assets/ai-in-hospitals.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gray-50 px-8 py-20" id="hero">
      <div className="container mx-auto px-3 grid md:grid-cols-2 items-center gap-12">
        {/* Text Section */}
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
            Your Health, <br /> Our{" "}
            <span className="text-blue-600 font-bold">Priority.</span>
          </h1>

          <p className="mt-6 text-xl md:text-lg text-gray-600 max-w-2xl leading-relaxed">
            Connect with top specialists, manage your medical records, and get medicines delivered — simple, secure, and fast.
          </p>

            <div className="mt-10 flex flex-wrap gap-5">
                <Link
                    to="/auth?mode=signup"
                    className="bg-gray-100 hover:bg-blue-100 text-blue-600 text-xl px-6 py-3 rounded-xl border border-blue-600 transition duration-200"
                >
                    Sign Up
                </Link>
                <Link
                    to="/auth?mode=login"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-3 rounded-xl transition duration-200"
                >
                    Log In
                </Link>
            </div>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center">
          <img
            src={heroImage}
            alt="Doctor Team"
            className="max-w-full h-auto drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
