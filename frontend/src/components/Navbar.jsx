// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Product Remarking System
        </Link>
        <div className="flex items-center space-x-6">
          {/* 所有人都能看到产品列表 */}
          <Link to="/products" className="hover:text-blue-200">
            Products
          </Link>

          {user ? (
            <>
              {/* 只有 admin 能看到的菜单项 */}
              {user.role === 'admin' && (
                <>
                  <Link to="/dashboard" className="hover:text-blue-200">
                    Dashboard
                  </Link>
                  <Link to="/manage-products" className="hover:text-blue-200">
                    Manage Products
                  </Link>
                  <Link to="/remarks" className="hover:text-blue-200">
                    All Remarks
                  </Link>
                  <Link to="/manage-users" className="hover:text-blue-200">
                    Manage Users
                  </Link>
                </>
              )}

              {/* 只有 seller 能看到的菜单项 */}
              {user.role === 'seller' && (
                <>
                  <Link to="/my-remarks" className="hover:text-blue-200">
                    My Remarks
                  </Link>
                  <Link to="/remark-product" className="hover:text-blue-200">
                    Remark a Product
                  </Link>
                </>
              )}

        
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="hover:text-blue-200">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            /* 未登录时显示 登录/注册 */
            <div className="flex items-center space-x-4">
              <Link to="/login" className="hover:text-blue-200">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
