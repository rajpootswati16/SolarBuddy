import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./admin/screens/AdminLogin";
import AdminDashboard from "./admin/screens/AdminDashboard";
import Home from "./useinterface/screens/Home";
import ProductDetailsPage from "./useinterface/screens/ProductDetailsPage";
import Cart from "./useinterface/screens/Cart";



function App() {
  return (
    <div>
      <Router>
        <Routes>
          
          <Route element={<AdminLogin/>} path="/adminlogin" />
          <Route element={<AdminDashboard/>} path="/admindashboard/*" />
          <Route element={<Home />} path="/home" />
          <Route element={<Cart />} path="/cart" />
          <Route element={<ProductDetailsPage />} path="/productdetailspage" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
