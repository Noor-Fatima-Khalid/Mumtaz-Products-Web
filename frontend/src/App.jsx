import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import About from "./pages/About";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

function AppContent() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const showLogin = searchParams.get("login") === "true";
  const showSignup = searchParams.get("signup") === "true";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col bg-green-50 min-h-screen w-full relative">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/about" element={<About />} />

        {/* On mobile, login/signup are full pages */}
        {isMobile && <Route path="/login" element={<Login />} />}
        {isMobile && <Route path="/signup" element={<SignUp />} />}
      </Routes>

      {/* On desktop, render overlays instead */}
      {!isMobile && (
        <>
          {showLogin && <Login />}
          {showSignup && <SignUp />}
        </>
      )}

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
