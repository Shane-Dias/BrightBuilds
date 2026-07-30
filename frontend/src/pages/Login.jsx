import React, { useState } from "react";
import { motion } from "../motionless";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Lock, User, LogIn, EyeOff, Eye } from "lucide-react";
import AutoScrollToTop from "../components/AutoScrollToTop";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState(""); // To handle errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Reset error state

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`, // Your backend API URL
        { email: email, password }
      );

      // Handle successful login response
      localStorage.setItem("token", response.data.token); // Store the token in localStorage
      localStorage.setItem("role", response.data.user.role); // Store the token in localStorage
      console.log("Login successful:", response.data);
      toast.success("Login Successful");

      setTimeout(() => {
        if (response.data.user.role === "Student") {
          navigate(`/student/${response.data.user.id}`);
        } else if (response.data.user.role === "Faculty") {
          navigate(`/faculty/${response.data.user.id}`);
        } else if (response.data.user.role === "Admin") {
          navigate(`/admin`);
        } else {
          navigate(`/`);
        }
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || "Something went wrong!"); // Handle error
      toast.error("Invail Credentails");
      console.error("Login failed:", err);
    }
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.03,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.97 },
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 py-12 pt-24"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <ToastContainer position="top-right" autoClose={5000} />
      <AutoScrollToTop />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md p-6 sm:p-8 mx-4 overflow-hidden rounded-2xl shadow-xl border"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-accent)' }}
      >
        {/* Glowing background effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div
            className="absolute -top-24 -left-24 w-48 h-48 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          ></div>
          <div
            className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: 'var(--amber-primary)' }}
          ></div>
        </div>

        {/* Login form */}
        <div className="relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-8"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Welcome Back
            </motion.h2>
            <motion.p variants={itemVariants} style={{ color: 'var(--text-secondary)' }}>
              Sign in to continue
            </motion.p>
          </motion.div>

          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-4">
              {/* email field */}
              <motion.div variants={itemVariants} className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={18} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <motion.input
                    whileFocus={{
                      boxShadow: "0 0 0 3px rgba(47, 167, 111, 0.35)",
                    }}
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-200"
                    style={{ borderColor: 'var(--border-accent)' }}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </motion.div>

              {/* Password field */}
              <motion.div variants={itemVariants} className="group">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock size={18} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <motion.input
                    whileFocus={{
                      boxShadow: "0 0 0 3px rgba(47, 167, 111, 0.35)",
                    }}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2.5 border rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-200"
                    style={{ borderColor: 'var(--border-accent)' }}
                    placeholder="Enter your password"
                    required
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff
                        size={18}
                        className="transition-colors duration-200"
                        style={{ color: 'var(--text-secondary)' }}
                      />
                    ) : (
                      <Eye
                        size={18}
                        className="transition-colors duration-200"
                        style={{ color: 'var(--text-secondary)' }}
                      />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Remember me and Forgot password */}
            {/* <motion.div
              variants={itemVariants}
              className="flex items-center justify-between pt-2"
            >
              <div className="flex items-center">
                <motion.input
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-400"
                >
                  Remember me
                </label>
              </div>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, color: "#93c5fd" }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Forgot password?
              </motion.a>
            </motion.div> */}

            {/* Submit button */}
            <motion.div variants={itemVariants}>
              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-lg text-white font-medium flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden"
                style={{ backgroundColor: 'var(--accent-primary)' }}
                onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'var(--accent-primary)')}
              >
                {isLoading ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center"
                  >
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center"
                  >
                    <LogIn size={18} className="mr-2" />
                    Sign In
                  </motion.span>
                )}
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Sign up link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Don't have an account?{" "}
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05, color: "#5dd3a7" }}
                whileTap={{ scale: 0.95 }}
                className="font-medium transition-colors duration-200"
                style={{ color: 'var(--accent-primary)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-light)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--accent-primary)'}
              >
                Sign up
              </motion.a>
            </p>
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
};

export default LoginPage;

