import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCaptcha = (value) => {
    setCaptchaToken(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      const { name, contactNo, email, password, confirmPassword } = formData;

      if (!name || !contactNo || !email || !password || !confirmPassword) {
        alert("Please fill in all fields!");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      if (!captchaToken) {
        alert("Please complete the CAPTCHA!");
        return;
      }

      console.log("User data info:", formData);

      alert("Registration successful!");

      setFormData({
        name: "",
        contactNo: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setCaptchaToken(null);
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-5xl p-6">
        {/* Left Side */}
        <motion.div
          className="text-center md:text-left max-w-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">PrintPack</h1>
          <p className="text-lg text-gray-700 font-medium">
            Your one-stop solution for professional printing services.
          </p>
        </motion.div>

        {/* Right Side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isSignUp ? "signup" : "login"}
            className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              {isSignUp ? "Create a New Account" : "Login to your Account"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isSignUp && (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    name="contactNo"
                    placeholder="Mobile Number"
                    value={formData.contactNo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {/* Password Field with Eye Icon */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              {/* Confirm Password Field */}
              {isSignUp && (
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </span>
                </div>
              )}

              {/* CAPTCHA */}
              {isSignUp && (
                <ReCAPTCHA
                  sitekey="6LcYZV4rAAAAAJh8mKaMn5sLQhCtMx5ijeXGJtRO"
                  onChange={handleCaptcha}
                />
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold rounded-lg transition"
              >
                {isSignUp ? "Sign Up" : "Login"}
              </motion.button>
            </form>

            {!isSignUp && (
              <p className="text-sm text-center text-indigo-600 mt-4 hover:underline cursor-pointer">
                Forgotten password?
              </p>
            )}

            <hr className="my-6" />

            <p className="text-center text-sm">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-indigo-700 font-semibold cursor-pointer hover:underline"
              >
                {isSignUp ? "Login here" : "Create New Account"}
              </span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginPage;
