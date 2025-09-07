// MainLayout.jsx
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      s{children}
      <Footer />
    </>
  );
}
