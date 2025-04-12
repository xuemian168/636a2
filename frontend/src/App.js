// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Login from './pages/Login';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Index />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* 首页路由，加载 Index 组件 */}
        <Route path="/" element={<Index />} />
        {/* login page */}
        <Route path="/login" element={<Login />} />
        {/* 可根据实际需求添加其他路由 */}
      </Routes>
    </Router>
  );
}

export default App;
