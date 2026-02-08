import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf6ef] to-[#f0e5d2] flex items-center justify-center p-6">
      {/* حاوية الفورم الرئيسية مع تأثير ظهور ناعم */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-[#C9A86A]/30 rounded-3xl shadow-2xl p-10 animate-fade-in-up">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 rounded-2xl bg-[#C9A86A]/20 border border-[#C9A86A]/30 mb-3">
            <Lock size={36} className="text-[#C9A86A]" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Login to Your Account
          </h1>
          <p className="text-neutral-600 mt-2 text-center">
            Enter your email and password to access to Dashboard
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="text-neutral-800 font-medium mb-1 block">
              Email
            </label>

            <div
              className="
      flex items-center
      border border-neutral-300
      rounded-xl
      px-3 py-2
      bg-white
      shadow-sm
      transition
      duration-200

      focus-within:border-[#C9A86A]
      focus-within:shadow-md
    "
            >
              <User size={20} className="text-[#C9A86A] mr-2" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="
        w-full
        bg-transparent
        outline-none
        text-neutral-800
        placeholder:text-neutral-400
      "
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="text-neutral-800 font-medium mb-1 block">
              Password
            </label>

            <div
              className="
      flex items-center
      border border-neutral-300
      rounded-xl
      px-3 py-2
      bg-white
      shadow-sm
      transition
      duration-200
      focus-within:border-[#C9A86A]
      focus-within:shadow-md
    "
            >
              <User size={20} className="text-[#C9A86A] mr-2" />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="*********"
                className="
        w-full
        bg-transparent
        outline-none
        text-neutral-800
        placeholder:text-neutral-400
      "
              />
            </div>
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-4 py-3 bg-[#C9A86A] text-white font-semibold rounded-xl shadow-lg hover:bg-[#b8965f] transition text-lg"
          >
            Login
          </motion.button>
        </form>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          className="mt-3 text-center text-sm"
        >
          @ 2025 POS System
        </motion.div>
      </div>
    </div>
  );
};

export { Login };
