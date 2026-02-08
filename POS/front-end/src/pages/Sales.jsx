import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { Package as PackageIcon, Package } from "lucide-react";
import { Box } from "@mui/material";
import { TbTypography } from "react-icons/tb";
const Sales = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [tax, setTax] = useState(5);
  const [discount, setDiscount] = useState(0);
  const loadProduct = async () => {
    const { data } = await API.get("/products");
    setProducts(data);
  };
  const addToCart = (product) => {
    setCart((prev) => {
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const finalTotal = total + (total * tax) / 100 - discount;
  const checkout = async () => {
    try {
      await API.post("/invoices", { item: cart, tax, discount });
      alert("Invoice Created");
      setCart([]);
      setDiscount(0);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <TbTypography variant="h4" mb={2}>
          sales
        </TbTypography>
      </Box>
    </>
  );
};

export { Sales };
