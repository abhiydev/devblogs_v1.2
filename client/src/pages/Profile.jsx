import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { URL } from "../../url";
import MyBlogs from "./MyBlogs";

const Profile = () => {
  const { user } = useParams(); // Get the user ID from the URL
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track if the user is in edit mode
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch the user profile data
  const fetchProfile = async () => {
    console.log("Fetching profile for user:", user); // Log the user ID to verify it's correct

    setLoading(true); // Start loading

    try {
      const res = await axios.get(`${URL}/api/user/${user}`, { withCredentials: true });
      console.log("Profile fetched successfully:", res.data); // Log the response data

      if (res.status === 200) {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
      } else {
        console.error("Failed to fetch profile: Status code", res.status); // Log the failure status
      }
    } catch (error) {
      console.error("Error fetching profile:", error); // Log any errors during the request
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    console.log("User ID from URL params:", user); // Log user ID from URL params

    if (user) {
      fetchProfile();
    } else {
      console.error("No user ID found in URL params"); // Log if no user ID is found
    }
  }, [user]);

  const handleUserUpdated = async (e) => {
    e.preventDefault();
    console.log("Updating profile with data:", { username, email, password }); // Log the data being updated

    try {
      // Update user profile logic goes here, e.g. sending data to backend
      const res = await axios.put(`${URL}/api/user/${user}`, {
        username,
        email,
        password
      }, { withCredentials: true });

      if (res.status === 200) {
        console.log("Profile updated successfully.");
        setIsEditing(false); // Disable edit mode after successful update
      } else {
        console.error("Failed to update profile: Status code", res.status); // Log the failure status
      }
    } catch (error) {
      console.error("Error updating profile:", error); // Log any errors during update
    }
  };

  const avatarLetter = username ? username.charAt(0).toUpperCase() : ""; // Get first letter of username for avatar

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4 mb-8">
            {/* Avatar */}
            <div className="w-24 h-24 bg-blue-500 text-white flex items-center justify-center rounded-full text-3xl font-semibold">
              {avatarLetter}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{username}</h2>
              <p className="text-gray-500">{email}</p>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p> // Display loading message while data is being fetched
          ) : (
            <>
              {isEditing ? (
                <form onSubmit={handleUserUpdated} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-between">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </>
          )}
          <div className="m-4">
          <MyBlogs/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
