import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../url';
import Footer from '../components/Footer';
import userContext from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
  
      // Store the token in localStorage
      console.log(res.data.token)
      localStorage.setItem('token', res.data.token); // Assuming the response contains a token
  
      setUser(res.data);
      navigate('/'); // Redirect to home page or wherever you want
    } catch (error) {
      setErr(true);
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-32 py-6">
        <h1 className="text-2xl font-extrabold">
          <Link to="/" className="hover:text-gray-300 transition">DevBlogs</Link>
        </h1>
        <h3 className="text-md">
          <Link to="/register" className="hover:underline">Register</Link>
        </h3>
      </div>

      {/* Login Form */}
      <div className="flex flex-grow items-center justify-center">
        <div className="bg-white text-black p-8 rounded-xl shadow-lg w-[90%] md:w-[30%]">
          <h1 className="text-2xl font-bold text-center mb-6">Login to your account</h1>

          <input
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErr(false);
            }}
          />
          
          <input
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErr(false);
            }}
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 mt-2 text-lg font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            disabled={!email || !password}
          >
            Login
          </button>

          {err && <h3 className="text-red-500 text-sm text-center mt-3">Invalid email or password.</h3>}

          <div className="text-center mt-4">
            <p className="text-gray-600">Don't have an account?</p>
            <p className="text-blue-600 hover:underline">
              <Link to="/register">Register instead.</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
