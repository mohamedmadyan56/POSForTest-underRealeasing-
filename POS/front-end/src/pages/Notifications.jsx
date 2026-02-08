import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    API.get("/notifications")
      .then((res) => setNotifications(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="pt-32 min-h-screen p-10 bg-gradient-to-b from-[#faf6ef] to-[#f0e5d2]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <div>
            <Bell size={32} className="text-[#C9A86A]" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 tracking-wide">
            Notifications
          </h1>
        </motion.div>

        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          <AnimatePresence>
            {notifications.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-neutral-600 text-lg"
              >
                No Notifications
              </motion.p>
            ) : (
              notifications.map((n) => (
                <motion.div
                  key={n._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="bg-white p-5 rounded-2xl shadow-md cursor-pointer transition-all border border-neutral-100"
                >
                  <p className="text-neutral-800 font-medium">{n.message}</p>
                  <span className="text-xs text-neutral-400 mt-2 block">
                    {/* هنا ممكن تضيف التاريخ أو وقت التنبيه */}
                  </span>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export { Notifications };
