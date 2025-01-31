import Navbar from '../components/Navbar';
import axios from 'axios';
import HomePost from '../components/HomePost';
import Footer from '../components/Footer';
import { URL } from '../../url';
import { useEffect, useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import UserContext from '../context/UserContext';

const Home = () => {
  const { search } = useLocation();
  const [post, setPost] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${URL}/api/posts`, { params: { search } });

      setPost(res.data);
      setFilterData(res.data);

      let cate = res.data.map((item) => item.categories);
      let sets = new Set();

      cate?.forEach((category) => {
        category?.forEach((catas) => {
          if (catas?.length > 0) sets.add(catas);
        });
      });

      setCat(Array.from(sets));
      setNoResults(res.data.length === 0);
    } catch (error) {
      console.error("Error fetching posts", error);
      setNoResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [search]);

  const filterPosts = (category) => {
    const filtered = post.filter((p) => p.categories.includes(category));
    setFilterData(filtered);
  };

  const resetFilter = () => {
    setFilterData(post);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {isLoading ? (
        <div className="flex flex-1 justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-10">
          {/* Category Filter Section */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {cat.length > 0 &&
              cat.map((category) => (
                <button
                  key={category}
                  className="px-5 py-2 text-sm font-medium border border-gray-300 bg-white rounded-lg shadow-sm transition-all hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-400"
                  onClick={() => filterPosts(category)}
                >
                  {category}
                </button>
              ))}
            <button
              onClick={resetFilter}
              className="px-6 py-2 text-sm font-semibold bg-gray-300 rounded-lg shadow-sm transition-all hover:bg-gray-400 focus:outline-none"
            >
              Show All
            </button>
          </div>

          {/* Posts Display Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {!noResults ? (
              filterData.map((post) => (
                <div
                  className="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg"
                  key={post._id}
                >
                  <Link to={user ? `/posts/post/${post._id}` : '/login'}>
                    <HomePost post={post} username={post.username} />
                  </Link>
                </div>
              ))
            ) : (
              <h3 className="text-center font-semibold text-lg text-gray-600 col-span-full">
                No posts available
              </h3>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
