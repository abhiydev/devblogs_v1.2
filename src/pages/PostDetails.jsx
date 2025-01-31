import { useNavigate, useParams } from "react-router-dom";
import Comment from '../components/Comment';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import axios from "axios";
import { URL } from '../../url';
import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [username, setUsername] = useState('username');
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Dark Mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${URL}/api/posts/${postId}`);
        console.log(data); // Debug the structure of the post data
        setPost(data);
        setUsername(data.userId?.username || 'Unknown User'); // Fallback to 'Unknown User' if undefined
      } catch (error) {
        console.error("Error fetching post details", error);
      }
    };
    fetchPost();
  }, [postId]);

  // Fetch post comments
  useEffect(() => {
    const fetchPostComments = async () => {
      setIsLoading(true); // Ensure loading starts before fetching comments
      try {
        const { data } = await axios.get(`${URL}/api/comments/post/${postId}`);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostComments();
  }, [postId]);

  // Delete post handler
  const handleDeletePost = async () => {
    try {
      await axios.delete(`${URL}/api/posts/${postId}`, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  // Post comment handler
  const postComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return; // Don't post empty comments
    try {
      const { data } = await axios.post(
        `${URL}/api/comments/create`,
        { 
          postId, 
          userId: user._id,
          text: comment, 
          author: user.username 
        },
        { withCredentials: true }
      );
      setComments((prevComments) => [...prevComments, data]);
      setComment(""); // Clear the comment input after posting
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  return (
    <div className={darkMode ? "bg-[#1E1B4B] text-[#E5E7EB]" : "bg-[#F3F4F6] text-[#111827]"}>
      <Navbar />
      <button onClick={toggleDarkMode} className="p-2 rounded bg-[#7C3AED] text-white fixed top-4 right-4">Toggle Dark Mode</button>
      {isLoading ? (
        <div className="h-80vh flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-6 md:px-16 mt-8">
          <div className={`border p-4 shadow-md rounded-lg ${darkMode ? 'bg-[#1E1B4B]' : 'bg-white'}` }>
            {/* Post Title and Actions */}
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{post.title}</h1>
              {user?.username === post?.userId?.username && (  // Check if the logged-in user is the post owner
                <div className="flex items-center space-x-4">
                  <p className="cursor-pointer hover:text-blue-500 transition duration-300" onClick={() => navigate(`/edit/${postId}`)}>
                    <BiEdit size={24} />
                  </p>
                  <p className="cursor-pointer text-red-600 hover:text-red-800 transition duration-300" onClick={handleDeletePost}>
                    <MdDelete size={24} />
                  </p>
                </div>
              )}
              <p>{username}</p>
            </div>

            {/* Post Image */}
            <div className="mt-4">
              <img src={post.photo} alt="Post" className="object-cover w-full h-72 rounded-lg shadow-md" />
            </div>

            {/* Post Description */}
            <div className="mt-6">
              <p className="text-lg">{post.desc}</p>
            </div>

            {/* Categories Section */}
            <div className="mt-6 flex flex-wrap items-center space-x-4">
              <span className="font-semibold">Categories:</span>
              {post.categories?.map((category, index) => (
                <span key={index} className="bg-[#D8B4FE] text-[#7C3AED] rounded-full px-4 py-2 text-sm">
                  {category}
                </span>
              ))}
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold">Comments</h3>
              {comments?.length > 0 ? (
                comments.map((comment) => <Comment key={comment._id} comment={comment} post={post} />)
              ) : (
                <p className="mt-4">No comments yet. Be the first to comment!</p>
              )}
            </div>

            {/* Add Comment */}
            <div className="mt-6 border-t pt-4">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your comment..."
                  className="w-full p-3 border rounded-md focus:outline-none"
                />
                <button
                  onClick={postComment}
                  className="bg-[#7C3AED] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#6B7280] transition duration-300"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
