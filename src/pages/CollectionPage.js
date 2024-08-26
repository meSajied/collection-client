import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {axiosInstance} from "../axiosInstance";
import {useAuth} from "../account/Authentication";

const CollectionPage = () => {
  const {id} = useParams();
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const {isLoggedIn} = useAuth();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await axiosInstance.get(`/collections/id/${id}`);
        setCollection(res.data);
        setComments(res.data.comments);
        console.log(collection);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    FetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;

    try {
      const response = await axiosInstance.post('/comments/', {
        comment: newComment,
      });

      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  return (
      <div className="p-8">
        <div className="flex justify-between items-start">
          <div className="w-1/2">
            <img
                src="http://localhost:8080/uploads/8.png"
                alt={collection.name}
                className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="w-1/2 pl-8">
            <h1 className="text-3xl font-bold mb-2">{collection.name}</h1>
            <p className="text-gray-600">by {collection.username}</p>
            <p className="mt-4 text-gray-700">{collection.description}</p>

            <div className="mt-4">
              <h2 className="text-xl font-semibold">Categories</h2>
              <ul className="mt-2">
                {collection.categories.map((category) => (
                    <li key={category.id}
                        className="bg-gray-200 inline-block px-3 py-1 rounded-full text-sm font-medium text-gray-700 mr-2">
                      {category.name}
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          {comments.length > 0 ? (
              comments.map((comment) => (
                  <div key={comment.id} className="mb-4">
                    <div className="flex items-center mb-2">
                      <p className="font-bold text-gray-800 mr-2">{comment.username}</p>
                      <p className="text-gray-500 text-sm">commented:</p>
                    </div>
                    <p className="bg-gray-100 p-4 rounded-md shadow-md text-gray-700">{comment.comment}</p>
                  </div>
              ))
          ) : (
              <p className="text-gray-500">No comments yet.</p>
          )}
        </div>

        {isLoggedIn && (
            <div className="mt-4">
          <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write your comment..."
              className="w-full p-4 border border-gray-300 rounded-md mb-4"
              rows="4"
          />
              <button
                  onClick={handleCommentSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Post Comment
              </button>
            </div>
        )}
      </div>
  );
};

export default CollectionPage;
