import React, { useContext, useState } from 'react';
import axios from 'axios';
import { URL } from '../../url';
import UserContext from '../context/UserContext';
import { MdDelete, MdEdit } from 'react-icons/md';

const Comment = ({ comment, onDelete, onUpdate, darkMode }) => {
  const { user } = useContext(UserContext); // Accessing the user from context
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [updatedComment, setUpdatedComment] = useState(comment.comment); // State to store the updated comment text
  const [error, setError] = useState(null); // State to store any errors

  // Check if the comment is valid before rendering
  if (!comment || !comment.author || !comment._id) {
    return <p>Comment data is missing.</p>; // Handle missing comment data
  }

  const deleteComment = async (id) => {
    try {
      const res = await axios.delete(`${URL}/api/comments/${id}`, { withCredentials: true });
      console.log(res.data);
      onDelete(id); // Notify the parent component to remove the comment
    } catch (error) {
      setError("Error deleting comment. Please try again.");
      console.log("Error deleting comment", error);
    }
  };

  const updateComment = async () => {
    try {
      const res = await axios.put(
        `${URL}/api/comments/${comment._id}`,
        { comment: updatedComment }, // Send the updated comment text in the request body
        { withCredentials: true }
      );
      console.log(res.data);
      setIsEditing(false); // Exit edit mode
      onUpdate(comment._id, updatedComment); // Notify the parent component to update the comment
    } catch (error) {
      setError("Error updating comment. Please try again. or reload");
      setTimeout(()=>{
        window.location.reload()
      },[1000])
      console.log("Error updating comment", error);
    }
  };

  return (
    <div className={`px-2 py-2 w-[90vh] rounded-lg my-2 ${darkMode ? 'bg-[#2D3748] text-white' : 'bg-gray-200 text-black'}`}>
      <div className='flex items-center justify-between'>
        <h3 className='font-bold'>
          @{comment.author} {/* Display the author's username */}
        </h3>
        <div className='flex justify-center items-center space-x-4'>
          {/* Display the comment's timestamp */}
          <p>
            {new Date(comment.createdAt).toLocaleDateString()} {/* Format the date */}
            {comment.updatedAt > comment.createdAt && (
              <span className='text-sm text-gray-500'> (Edited)</span>
            )}
          </p>
          {user?._id === comment.userId && (
            <div className='flex items-center space-x-2'>
              <p className='cursor-pointer' onClick={() => setIsEditing(!isEditing)}>
                <MdEdit />
              </p>
              <p className='cursor-pointer' onClick={() => deleteComment(comment._id)}>
                <MdDelete />
              </p>
            </div>
          )}
        </div>
      </div>
      {error && <p className='text-red-500'>{error}</p>} {/* Show error message if any */}
      {isEditing ? (
        <div className='mt-2'>
          <input
            type='text'
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}
            className='w-full px-2 py-1 border rounded'
          />
          <button
            onClick={updateComment}
            className={`mt-2 px-4 py-1 rounded hover:bg-blue-600 ${darkMode ? 'bg-blue-500' : 'bg-blue-500'}`}
          >
            Save
          </button>
        </div>
      ) : (
        <p className='px-4 mt-2'>
          {comment.comment} {/* Display the actual comment text */}
        </p>
      )}
    </div>
  );
};

export default Comment;
