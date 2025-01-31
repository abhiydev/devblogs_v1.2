import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaPen, FaBlog, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import axios from 'axios';
import UserContext from '../context/UserContext';

const Menu = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${URL}/api/auth/logout`, { withCredentials: true });
      setUser(null);
      navigate('/login');
      console.log('Logout success:', res);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 w-[220px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-lg shadow-lg p-4 space-y-4">
      {!user && (
        <>
          <Link to="/login" className="flex items-center text-gray-900 dark:text-white text-sm hover:text-gray-500 cursor-pointer">
            <FaSignInAlt className="mr-2" /> Login
          </Link>
          <Link to="/register" className="flex items-center text-gray-900 dark:text-white text-sm hover:text-gray-500 cursor-pointer">
            <FaUserPlus className="mr-2" /> Register
          </Link>
        </>
      )}
      {user && (
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
  );
};

export default Menu;
