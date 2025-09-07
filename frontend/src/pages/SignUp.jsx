import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  // ✅ inline isMobile check
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Signup successful, please login");
        navigate(isMobile ? "/login" : "/?login=true"); // ✅ mobile vs desktop
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignup = () => {
    // TODO: Trigger Google OAuth flow
  };

  return (
    <div
      className="
        md:fixed md:inset-0 md:flex md:items-center md:justify-center md:z-50 md:bg-black/40
        w-full min-h-screen bg-white
      "
    >
      <div
        className="
          w-full h-full p-6
          md:h-auto md:max-w-md md:p-8 
          bg-white space-y-6 relative 
          rounded-none md:rounded-2xl md:shadow-lg
        "
      >
        {/* Close button (desktop only) */}
        <button
          onClick={() => navigate("/")}
          className="hidden md:block absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-green-900">Sign Up</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Create Account
          </button>
        </form>

        {/* Google */}
        <button
          onClick={handleGoogleSignup}
          className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          <span>Sign up with Google</span>
        </button>

        {/* Login link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to={isMobile ? "/login" : "/?login=true"} // ✅ mobile vs desktop
            className="text-green-700 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
