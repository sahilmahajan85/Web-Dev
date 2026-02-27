import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
const token = localStorage.getItem('token');
let userId = null;
if (token) {
  const decoded = jwtDecode(token);
  userId = decoded.userId;
}
  useEffect(() => {
    axios.get('/posts').then(res => setPosts(res.data));
  }, []);
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await axios.delete(`/posts/${id}`);
      setPosts(posts.filter(p => p._id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  return (
    <div>
      <h2>Hello Ravi</h2>
      {posts.length === 0 ? <p>No posts yet.</p> : (
        posts.map(post => (
          <div className="card mb-3" key={post._id}>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.content}</p>
              <small className="text-muted">By {post.author}</small>
             <small className="text-muted">By {post.author}</small>
              <div className="mt-2">
               {userId === post.author && (
  <>
    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(post._id)}>Edit</button>
    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(post._id)}>Delete</button>
  </>
)}

              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;



