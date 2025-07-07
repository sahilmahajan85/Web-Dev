import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateNote() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    const res = await axios.post('http://localhost:5000/notes', { title });
    navigate(`/note/${res.data._id}`);
  };

  return (
    <div className='create'>
      <h2>Create Note</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}

export default CreateNote;
