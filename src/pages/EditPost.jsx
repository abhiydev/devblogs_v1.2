import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import userContext from "../context/UserContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import { URL } from '../../url';

const EditPost = () => {
  const { id } = useParams();
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  // Fetch post for editing
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/${id}`);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setCats(res.data.categories);
      } catch (error) {
        console.log("Error fetching post for edit", error);
      }
    };
    fetchPost();
  }, [id]);

  const addCategory = () => {
    if (cat.trim() && !cats.includes(cat)) {
      setCats((prevCats) => [...prevCats, cat]);
      setCat("");
    }
  };

  const deleteCategory = (index) => {
    setCats((prevCats) => prevCats.filter((_, i) => i !== index));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      console.log("User not authenticated");
      return;
    }

    const post = {
      title,
      desc,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const fileName = file.name;
      data.append("img", file);
      post.photo = fileName;

      try {
        await axios.post(`${URL}/api/upload`, data, { withCredentials: true });
      } catch (error) {
        console.error("Image upload failed:", error);
        return;
      }
    }

    try {
      const res = await axios.put(`${URL}/api/posts/${id}`, post, { withCredentials: true });
      navigate(`/posts/post/${res.data._id}`);
    } catch (error) {
      console.error("Post update failed:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center py-8 bg-gray-50">
        <div className="w-full md:w-3/4 lg:w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Edit Post
          </h1>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-4 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
                className="w-full p-4 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="w-full p-4 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {[
                  "Artificial Intelligence",
                  "Cloud Computing",
                  "Cybersecurity",
                  "Software Development",
                  "Data Science",
                  "Machine Learning",
                  "DevOps",
                  "Blockchain",
                  "Web Development",
                  "Networking & Infrastructure",
                ].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={addCategory}
                className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-300"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap mt-4">
              {cats.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-200 rounded-md px-4 py-2 mr-4 mt-2"
                >
                  <p className="text-lg text-gray-700">{category}</p>
                  <button
                    type="button"
                    onClick={() => deleteCategory(index)}
                    className="text-gray-500 hover:text-black"
                  >
                    <ImCross />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <textarea
                placeholder="Post Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows="6"
                required
                className="w-full p-4 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full p-4 text-xl font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition duration-300"
              >
                Update Post
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
