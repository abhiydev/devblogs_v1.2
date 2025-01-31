import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HomePost from '../components/HomePost';
import { URL } from '../../url';
import UserContext from '../context/UserContext';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyBlogs = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the posts for the current user
  const fetchMyPosts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
      setPosts(res.data);
    } catch (error) {
      console.log("Error fetching user posts", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyPosts();
    }
  }, [user]);

  // Function to handle post deletion
  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`${URL}/api/posts/${postId}`);
        setPosts(posts.filter(post => post._id !== postId));  // Remove deleted post from state
      } catch (error) {
        console.log("Error deleting post", error);
      }
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 py-10">
      
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">My Blogs</h1>

        {isLoading ? (
          <div className="h-screen w-full flex justify-center items-center bg-gray-50">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="flex flex-col bg-white shadow-lg rounded-lg p-4 w-full sm:w-[45vw] lg:w-[30vw]">
                  <HomePost post={post} username={post.username} />

                  <div className="flex justify-between mt-4">
                    <Link to={`/edit/${post._id}`} className="text-blue-600 hover:underline">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h3 className="text-center text-xl text-gray-600">You have not posted any blogs yet.</h3>
            )}
          </div>
        )}
      </div>
      
    </div>
    </>
  );
};

export default MyBlogs;
