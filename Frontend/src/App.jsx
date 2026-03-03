import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Contactus from "./components/Contactus";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Logout from "./components/Logout";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Services from "./components/Services";
import Predict from "./pages/Predict";
import PCOSForm from "./pages/pcos/PCOSForm";
import ThyroidForm from "./pages/thyroid/ThyroidForm";
import PCOSResult from "./pages/pcos/PCOSResult";
import ThyroidResult from "./pages/thyroid/ThyroidResult";
import ScrollToTop from "./components/ScrollToTop";



function App() {
 
  return (

      
    <BrowserRouter>
     <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
       
        <Route path="/predict" element={<Predict />} />
        <Route path="/predict/pcos" element={<PCOSForm />} />
        <Route path="/predict/thyroid" element={<ThyroidForm />} />
        <Route path="/result/pcos" element={<PCOSResult />} />
        <Route path="/result/thyroid" element={<ThyroidResult />} />
        
        <Route element={<ProtectedRoutes />}>
         
          <Route path="/contact" element={<Contactus />} />
          <Route path="/slider" element={<Slider />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/service" element={<Services />} />
        
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
