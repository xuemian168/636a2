import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register' ; 
import Profile from './pages/Profile';
import Products from './pages/Products';

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

      </Routes>
    </Router>
  );
}

export default App;
