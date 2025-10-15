import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobileno: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmResetPassword, setConfirmResetPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmResetPassword, setShowConfirmResetPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCaptcha = (value) => {
    setCaptchaToken(value);
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmResetPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          oldPassword,
          newPassword,
          confirmPassword: confirmResetPassword,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Password updated successfully! Check your email for confirmation.");
        setIsForgot(false);
        setShowChangePassword(false);
        setChangePasswordForm(false);
        setOtpSent(false);
        setOtp("");
        setOldPassword("");
        setNewPassword("");
        setConfirmResetPassword("");
        setFormData((prev) => ({ ...prev, email: "" }));
      } else {
        alert(result.message || "Failed to update password.");
      }
    } catch (err) {
      alert("Server error.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isForgot) {
      if (!otpSent && !showChangePassword && !changePasswordForm) {
        // Step 1: Send OTP
        try {
          const res = await fetch("http://localhost:5000/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email }),
          });

          const result = await res.json();
          if (res.ok) {
            alert("OTP sent successfully to your registered email.");
            setOtpSent(true);
          } else {
            alert(result.message || "Failed to send OTP.");
          }
        } catch (err) {
          alert("Server error. Try again later.");
        }
      } else if (otpSent) {
        // Step 2: Verify OTP
        try {
          const res = await fetch("http://localhost:5000/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email, otp }),
          });

          const result = await res.json();
          if (res.ok) {
            setOtpSent(false);
            setShowChangePassword(true);
            setOtp("");
          } else {
            alert(result.message || "Invalid OTP.");
          }
        } catch (err) {
          alert("Server error. Try again later.");
        }
      } else if (changePasswordForm) {
        // Handle change password form submit
        await handleResetPassword();
      }
      return;
    }

    // ---------------------- LOGIN SECTION ----------------------
    if (!isSignUp) {
      const { email, password } = formData;
      if (!email || !password) {
        alert("Please fill in all fields!");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const text = await response.text();
        const result = JSON.parse(text);
        if (response.ok) {
          alert(result.message || "Login successful!");
          localStorage.setItem("user", JSON.stringify(result.user));
          setFormData({ email: "", password: "" });
          navigate("/");
        } else {
          alert(result.message || "Invalid credentials");
        }
      } catch (err) {
        alert("Server error. Please try again later.");
      }
    }

    // ---------------------- SIGNUP SECTION ----------------------
    else {
      const { name, mobileno, email, password, confirmPassword } = formData;

      if (!name || !mobileno || !email || !password || !confirmPassword) {
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

      try {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const text = await response.text();
        const result = JSON.parse(text);
        if (response.ok) {
          alert(result.message || "Registration successful!");
          setFormData({
            name: "",
            mobileno: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setCaptchaToken(null); // Reset CAPTCHA
          setIsSignUp(false);
        } else {
          alert(result.message || result.error || "Something went wrong.");
        }
      } catch (err) {
        alert("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-5xl p-6">
        {/* Back to Home Button - Top Left */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </button>
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

        <AnimatePresence mode="wait">
          <motion.div
            key={isForgot ? "forgot" : isSignUp ? "signup" : "login"}
            className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              {isForgot
                ? "Forgot Password"
                : isSignUp
                ? "Create a New Account"
                : "Login to your Account"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isForgot ? (() => {
                if (!otpSent && !showChangePassword && !changePasswordForm) {
                  return (
                    <>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your registered email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold rounded-lg transition"
                      >
                        Send OTP
                      </motion.button>
                    </>
                  );
                } else if (otpSent) {
                  return (
                    <>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your registered email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        readOnly
                      />
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold rounded-lg transition"
                      >
                        Verify OTP
                      </motion.button>
                    </>
                  );
                } else if (showChangePassword) {
                  return (
                    <>
                      <p className="text-center text-gray-600">Do you want to change your password?</p>
                      <div className="flex justify-between mt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setShowChangePassword(false);
                            setChangePasswordForm(true);
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowChangePassword(false);
                            setIsForgot(false);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                        >
                          No
                        </button>
                      </div>
                    </>
                  );
                } else if (changePasswordForm) {
                  return (
                    <>
                      {/* Old Password */}
                      <div className="relative">
                        <input
                          type={showOldPassword ? "text" : "password"}
                          placeholder="Old Password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          className="w-full px-4 py-3 border rounded-lg pr-10 focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showOldPassword ? (
                            <EyeSlashIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {/* New Password */}
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="New Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-3 border rounded-lg pr-10 focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showNewPassword ? (
                            <EyeSlashIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {/* Confirm Password */}
                      <div className="relative">
                        <input
                          type={showConfirmResetPassword ? "text" : "password"}
                          placeholder="Confirm New Password"
                          value={confirmResetPassword}
                          onChange={(e) => setConfirmResetPassword(e.target.value)}
                          className="w-full px-4 py-3 border rounded-lg pr-10 focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmResetPassword(!showConfirmResetPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmResetPassword ? (
                            <EyeSlashIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold rounded-lg transition"
                      >
                        Change Password
                      </motion.button>
                    </>
                  );
                }
                return null;
              })() : (
                <>
                  {isSignUp && (
                    <>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                      <input
                        type="text"
                        name="mobileno"
                        placeholder="Mobile Number"
                        value={formData.mobileno}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </>
                  )}

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />

                  {/* Confirm Password Field */}
                  {isSignUp && (
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  )}

                  {/* CAPTCHA */}
                  {isSignUp && (
                    <ReCAPTCHA
                      sitekey="6LcYZV4rAAAAAJh8mKaMn5sLQhCtMx5ijeXGJtRO"
                      onChange={handleCaptcha}
                    />
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold rounded-lg transition"
                  >
                    {isSignUp ? "Sign Up" : "Login"}
                  </motion.button>
                </>
              )}
            </form>

            {!isForgot && !isSignUp && (
              <p
                className="text-sm text-center text-indigo-600 mt-4 hover:underline cursor-pointer"
                onClick={() => setIsForgot(true)}
              >
                Forgotten password?
              </p>
            )}

            <hr className="my-6" />

            <p className="text-center text-sm">
              {isForgot ? (
                <span
                  onClick={() => setIsForgot(false)}
                  className="text-indigo-700 font-semibold cursor-pointer hover:underline"
                >
                  Back to Login
                </span>
              ) : isSignUp ? (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsSignUp(false)}
                    className="text-indigo-700 font-semibold cursor-pointer hover:underline"
                  >
                    Login here
                  </span>
                </>
              ) : (
                <>
                  Don’t have an account?{" "}
                  <span
                    onClick={() => setIsSignUp(true)}
                    className="text-indigo-700 font-semibold cursor-pointer hover:underline"
                  >
                    Sign up
                  </span>
                </>
              )}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginPage;
