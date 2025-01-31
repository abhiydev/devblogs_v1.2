import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { URL } from '../../url';
import PropTypes from "prop-types";
import { Navigate, useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading state to track API request
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;  // Track whether the component is mounted

    const fetchUser = async () => {
      const token = localStorage.getItem('token');  // Get the token from localStorage
    
      if (!token) {
        navigate('/login');
        setLoading(false);
        return;
      }
    
      try {
        const res = await axios.get(`${URL}/api/auth/refetch`, {
          headers: { Authorization: `Bearer ${token}` }, // Send token in headers
          withCredentials: true,
        });
    
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching user data: ${error?.response?.data?.error || error.message}`);
        navigate('/login');
        setLoading(false);
      }
    };
    

    fetchUser();

    return () => {
      isMounted = false;  // Cleanup function to avoid memory leaks
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, error, loading }}>
      {loading ? (
        <div>Loading...</div>  // Show loading state while fetching data
      ) : error ? (
        <div>{error}</div>  // Show error message if any error occurs
      ) : (
        children  // Render children if no errors and loading is complete
      )}
    </UserContext.Provider>
  );
};

// Define PropTypes for the UserProvider component
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,  // Validate that 'children' is a valid React node
};

export default UserContext;
