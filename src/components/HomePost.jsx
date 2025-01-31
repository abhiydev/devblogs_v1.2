import React from 'react';
import { format } from 'date-fns'; // To format dates

const HomePost = ({ post }) => {
  const { title, desc, categories, photo, createdAt, username } = post;

  // Format the 'createdAt' date using date-fns
  const formattedDate = createdAt ? format(new Date(createdAt), 'dd MMM yyyy') : '';

  return (
    <div className="max-w-sm mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {/* Image Section */}
      <div className="relative group">
        <img
          className="object-cover w-full h-56 rounded-t-lg transform group-hover:scale-105 transition-all duration-300 ease-in-out"
          src={photo}
          alt={`Image for ${title}`} // Improve alt text for better accessibility
        />
        {/* Hover effect */}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300 line-clamp-2">{title}</h2>
        <p className="text-sm text-blue-600 mt-1">Posted by {username}</p>

        {/* Categories */}
        <div className="mt-2 flex flex-wrap gap-2">
          {categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <span
                key={index}
                className="text-xs bg-gray-200 px-3 py-1 rounded-full text-gray-600 font-medium hover:bg-blue-500 hover:text-white transition-colors duration-300"
              >
                {category}
              </span>
            ))
          ) : null}
        </div>

        {/* Description */}
        <p className="text-gray-700 mt-2 text-sm line-clamp-2">{desc}</p>

        {/* Date */}
        <p className="text-sm text-gray-500 mt-2">{formattedDate}</p>
      </div>
    </div>
  );
};

export default HomePost;
