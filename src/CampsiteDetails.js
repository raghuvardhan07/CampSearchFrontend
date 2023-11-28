// CampsiteDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CampsiteDetails.css';

const CampsiteDetails = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch image details and comments using the provided id
    axios
      .get(`http://localhost:5000/api/getImageById/${id}`)
      .then((response) => {
        setImage(response.data);
        // Fetch comments for the image
        axios
          .get(`http://localhost:5000/api/getReviewsByImageId/${id}`)
          .then((commentsResponse) => setComments(commentsResponse.data.reviews))
          .catch((error) =>
            console.error('Error fetching comments:', error)
          );
      })
      .catch((error) =>
        console.error('Error fetching image details:', error)
      );
  }, [id, comments]);

  const handleCommentSubmit = () => {
    // Post a new comment
    axios
      .post(`http://localhost:5000/api/postReview/${id}`, {
        user: 'ExampleUser', // Replace with actual user data
        comment: newComment,
        rating: 0, // Replace with the actual rating (if applicable)
      })
      .then((response) => {
        // Update comments state with the new comment
        setComments([...comments, response.data.reviews]);
        // Clear the input field
        setNewComment('');
      })
      .catch((error) =>
        console.error('Error posting comment:', error)
      );
  };

  return (
    <div className="container">
      <div className="details-container">
        {image ? (
          <>
            <img
              className='image-container'
              src={`http://localhost:5000/images/${image.imagePath}`}
              alt={image.description}
            />
            <div className="details">
              <h2>{image.location}</h2>
              <p>{image.description}</p>
              <p><b>Uploaded by</b>: {image.uploadedBy}</p>
              {/* You can customize the display of other image details as needed */}
            </div>
          </>
        ) : (
          <p className="loading">Loading...</p>
        )}
      </div>
      <div className="comments">
        <h3>Comments</h3>
        <ul>
          {comments && comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.user}:</strong> {comment.comment}
            </li>
          ))}
        </ul>
        <div className="comment-form">
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CampsiteDetails;
