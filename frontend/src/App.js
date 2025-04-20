import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register' ; 
import Profile from './pages/Profile';
import Products from './pages/Products';
import ManageProducts  from './pages/ManageProducts';
import AllRemarks      from './pages/AllRemarks';
import ManageUsers     from './pages/ManageUsers';

import MyRemarks       from './pages/MyRemarks';
import RemarkProduct   from './pages/RemarkProduct';
import MyProducts      from './pages/MyProducts';
import Dashboard       from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* home page route and Index components */}
        <Route path="/" element={<Index />} />
        {/* login page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/addproducts" element={<AddProducts/>}/>
        <Route path="/dashboard"      element={<Dashboard />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/remarks"        element={<AllRemarks />} />
        <Route path="/manage-users"   element={<ManageUsers />} />
        <Route path="/add-product"    element={<AddProducts />} />
        {/* 仅 seller */}
        <Route path="/my-remarks"     element={<MyRemarks />} />
        <Route path="/remark-product" element={<RemarkProduct />} />
        {/* 仅 provider 可以是adnin*/}
        <Route path="/my-products"    element={<MyProducts />} />
      </Routes>

    </Router>
  );
}

export default App;
