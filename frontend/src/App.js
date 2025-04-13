import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register' ; 

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

      </Routes>
    </Router>
  );
}

export default App;
