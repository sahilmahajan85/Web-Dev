import { useState } from 'react';
import axios from '../utils/axios';

function CreatePost() {
  const [post, setPost] = useState({ title: '', content: '' });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/posts', post);
    window.location.href = '/';
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" name="title" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea className="form-control" name="content" rows="5" onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-success">Publish</button>
      </form>
    </div>
  );
}

export default CreatePost;
