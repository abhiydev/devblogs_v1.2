import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MyBlogs from './pages/MyBlogs';
import PostDetails from './pages/PostDetails';
import Profile from './pages/Profile';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import UserContext from './context/UserContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  const { user } = useContext(UserContext); // Get the user from context

  // Private route that checks if the user is authenticated
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/write" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
      <Route path="/posts/post/:id" element={<PostDetails />} />
      <Route path="/edit/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
      <Route path="/myblogs/:id" element={<PrivateRoute>
        <Navbar/>
        <MyBlogs />
        <Footer/>
        </PrivateRoute>} />
      <Route path="/profile/:user" element={<PrivateRoute><Profile /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
