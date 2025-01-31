import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaUser, FaPen, FaSignOutAlt, FaBars, FaTimes, FaBlog } from 'react-icons/fa';
import axios from 'axios';
import UserContext from '../context/UserContext';

const Navbar = () => {
  const [prompt, setPrompt] = useState('');
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await axios.get(`${URL}/api/auth/logout`, { withCredentials: true });
      localStorage.removeItem('token');  // Remove token from localStorage
      setUser(null);  // Update the user context
      navigate('/login');  // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300 transition">DevBlogs</Link>
        </h1>

        {/* Search Bar (Only on Home Page) */}
        {location.pathname === '/' && (
          <div className="hidden md:flex items-center bg-white rounded-full overflow-hidden shadow-md">
            <input
              type="text"
              className="px-4 py-2 text-black outline-none w-64"
              placeholder="Search a post"
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={() => navigate(prompt ? `/?search=${prompt}` : '/') }
              className="p-3 bg-gray-800 text-white hover:bg-gray-700 transition"
            >
              <BsSearch />
            </button>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/write" className="hover:text-gray-300 transition flex items-center space-x-1">
                <FaPen /> <span>Write</span>
              </Link>
              <Link to={`/profile/${user._id}`} className="hover:text-gray-300 transition flex items-center space-x-1">
                <FaUser /> <span>Profile</span>
              </Link>
              <Link to={`/myblogs/${user._id}`} className="hover:text-gray-300 transition flex items-center space-x-1">
                <FaBlog /> <span>My Blogs</span>
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-gray-300 transition flex items-center space-x-1"
              >
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
              <Link to="/register" className="hover:text-gray-300 transition">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div onClick={() => setMenu(!menu)} className="md:hidden cursor-pointer text-lg">
          {menu ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menu && (
        <div className="bg-gray-100 dark:bg-gray-900 w-[220px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-lg shadow-lg p-4 space-y-4">
          {!user ? (
            <>
              <Link to="/login" className="flex items-center text-gray-900 dark:text-white text-sm hover:text-gray-500 cursor-pointer">
                <FaSignInAlt className="mr-2" /> Login
              </Link>
              <Link to="/register" className="flex items-center text-gray-900 dark:text-white text-sm hover:text-gray-500 cursor-pointer">
                <FaUserPlus className="mr-2" /> Register
              </Link>
            </>
          ) : (
            <>
              <Link to={`/profile/${user._id}`} className="flex items-center text-gray-900 dark:text-white text-sm hover:text-gray-500 cursor-pointer">
                <FaUser className="mr-2" /> Profile
              </Link>
              <Link to="/write" className="flex items-center text-gray-900 dark:text-white text-sm hover:text-gray-500 cursor-pointer">
                <FaPen className="mr-2" /> Write
              </Link>
              <Link to={`/myblogs/${user._id}`} className="flex items-center text-gray-900 dark:text-white text-sm hover:text-gray-500 cursor-pointer">
                <FaBlog className="mr-2" /> My Blogs
              </Link>
              <button onClick={handleLogout} className="flex items-center text-gray-900 dark:text-white text-sm hover:text-gray-500 cursor-pointer">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
