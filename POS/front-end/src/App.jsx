import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Notifications } from "./pages/Notifications";
import { Products } from "./pages/Products";
const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
