import React, { useState } from "react";
import {Link} from "react-router-dom"
import axios from 'axios';
import './UploadStyles.css';

const ImageUpload = () => {
  const [upload, setUpload] = useState({
    uploadedBy: "",
    location: "",
    description: "",
    photo: null, 
  });

  const handleChange = (e) => {
    setUpload({ ...upload, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    setUpload({
      ...upload,
      photo: file,
      photoPreview: URL.createObjectURL(file), 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('uploadedBy', upload.uploadedBy);
    formData.append('location', upload.location);
    formData.append('description', upload.description);
    formData.append('photo', upload.photo);

    axios.post('http://localhost:5000/api/upload', formData)
      .then(res => {
        console.log(res);
        setUpload({
          uploadedBy: "",
          location: "",
          description: "",
          photo: null, 
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="image-upload-container">
        <label>Upload your Experience!</label>
        <input
          type="text"
          placeholder="Enter your name"
          name="uploadedBy"
          value={upload.uploadedBy}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter the location name"
          name="location"
          value={upload.location}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Description"
          name="description"
          value={upload.description}
          onChange={handleChange}
        />
        <label>Upload the file:</label>
        <br />
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="photo"
          onChange={handlePhoto}
        />
        {upload.photo && (
          <img
            src={upload.photoPreview}
            alt="Preview"
            style={{ maxWidth: '100%', marginTop: '10px' }}
          />
        )}
        <input type="submit" value="Upload" />
      </form>
      <Link to="/home" className="link-to-home">Home</Link>

    </div>
  );
}

export default ImageUpload;