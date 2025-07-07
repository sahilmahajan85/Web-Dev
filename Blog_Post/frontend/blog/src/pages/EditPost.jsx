/*
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/posts').then(res => {
      const match = res.data.find(p => p._id === id);
      if (match) setPost(match);
    });
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/posts/${id}`, post);
    navigate('/');
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" name="title" value={post.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea className="form-control" name="content" value={post.content} onChange={handleChange} rows="5" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={() => handleChange}>Update</button>
      </form>
    </div>
  );
}

export default EditPost;*/
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../utils/axios';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '' });

  useEffect(() => {
    axios.get('/posts')
      .then(res => {
        const match = res.data.find(p => p._id === id);
        if (match) setPost({ title: match.title, content: match.content });
      });
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/posts/${id}`, post);
      navigate('/');
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input name="title" className="form-control" value={post.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Content</label>
          <textarea name="content" className="form-control" value={post.content} onChange={handleChange} />
        </div>
        <button className="btn btn-primary" type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditPost;

