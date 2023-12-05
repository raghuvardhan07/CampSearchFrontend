// CampsiteDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CampsiteDetails.css';
import { useAuth } from './AuthContext';

const CampsiteDetails = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0); // State to store the new rating
  const { session } = useAuth();
  const [addComment, setAddComment] = useState(false)

  useEffect(() => {
    // Fetch image details and comments using the provided id
    axios
      .get(`http://localhost:5000/api/getImageById/${id}`)
      .then((response) => {
        setImage(response.data);
        // Fetch comments for the image
        axios
          .get(`http://localhost:5000/api/getReviewsByImageId/${id}`)
          .then((commentsResponse) =>
            setComments(commentsResponse.data.reviews)
          )
          .catch((error) =>
            console.error('Error fetching comments:', error)
          );
      })
      .catch((error) =>
        console.error('Error fetching image details:', error)
      );
  }, [id, comments]);
  const handleAddComment = () => {
    setAddComment(!addComment)
  }
  const handleCommentSubmit = () => {
    // Post a new comment with the rating
    const userName = session?.name || 'Guest';
    axios
      .post(`http://localhost:5000/api/postReview/${id}`, {
        user: userName,
        comment: newComment,
        rating: newRating, // Use the new rating state
      })
      .then((response) => {
        // Update comments state with the new comment
        setComments([...comments, response.data.reviews]);
        // Clear the input fields
        setNewComment('');
        setNewRating(0);
        setAddComment(!addComment)
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
        <div className='public-comments'>
        <h3>Comments</h3>
        <ul>
          {comments && comments.map((comment, index) => (
            <li key={index} className='user-feedback'>
              <div className='review'><strong>{comment.user}:</strong> {comment.comment}</div>
              <div className="rating">
                {/* Display stars based on the comment's rating */}
                {Array.from({ length: comment.rating }).map((_, i) => (
                  <span key={i} role="img" aria-label="star">⭐</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
        </div>
        
        <div className="comment-form">
          {!addComment && <button onClick={handleAddComment} className='add-comment'>Add Comment</button>}
          {addComment && <><textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div>
            {/* Create a simple rating input */}
            <select
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
            >
              <option value={0}>Select a rating</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleCommentSubmit}>Submit</button></>}
        </div>
      </div>
    </div>
  );
};



export default CampsiteDetails;
