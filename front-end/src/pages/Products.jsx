import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { Package as PackageIcon, Package } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch products");
      });
  }, []);

  return (
    <>
      <div className="pt-32 min-h-screen p-10 bg-gradient-to-b from-[#faf6ef] to-[#f0e5d2]">
        <motion.h1
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-neutral-900 mb-10 flex items-center gap-3"
        >
          <PackageIcon size={30} />
          Products
        </motion.h1>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500"
          >
            {error}
          </motion.p>
        )}

        {products.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-neutral-600 text-lg"
          >
            No Products Found
          </motion.p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="p-6 bg-white/90 backdrop-blur-xl border border-[#C9A86A]/25 rounded-2xl shadow-md hover:shadow-2xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#C9A86A]/10 border border-[#C9A86A]/30 rounded-xl">
                    <Package size={28} className="text-[#C9A86A]" />
                  </div>
                  <p className="text-xl font-semibold text-neutral-800">
                    {p.name}
                  </p>
                </div>
                <p className="text-neutral-700 font-medium">
                  Purchase Price: ${p.purchasePrice}
                </p>
                <p className="text-neutral-700 font-medium mb-3">
                  Selling Price: ${p.sellingPrice}
                </p>
                <p className="text-neutral-500 text-sm mt-1">
                  Stock: {p.stock}
                </p>
                <p className="text-neutral-500 text-sm mt-1">
                  Category: {p.category}
                </p>
                {p.stock < p.minStock && (
                  <p className="text-red-500 text-xs mt-2 font-bold animate-pulse">
                    Low Stock Warning!
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export { Products };
