import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import socket from '../socket';
import TextareaAutosize from 'react-textarea-autosize';

function NoteEditor() {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [activeUsers, setActiveUsers] = useState(1);
  const [lastUpdated, setLastUpdated] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchNote = async () => {
      const res = await axios.get(`http://localhost:5000/notes/${id}`);
      setContent(res.data.content);
      setTitle(res.data.title);
      setLastUpdated(new Date(res.data.updatedAt).toLocaleTimeString());
    };
    fetchNote();

    socket.emit('join_note', id);

    socket.on('note_update', (newContent) => {
      setContent(newContent);
    });

    socket.on('active_users', (count) => {
      setActiveUsers(count);
    });

    return () => {
      socket.off('note_update');
      socket.off('active_users');
    };
  }, [id]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    socket.emit('note_update', { noteId: id, content: newContent });

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      axios.put(`http://localhost:5000/notes/${id}`, { content: newContent });
      setLastUpdated(new Date().toLocaleTimeString());
    }, 5000); // auto-save
  };

  return (
    <div className='note'>
      <h2>{title}</h2>
      <p>Active Users: {activeUsers}</p>
      <p>Last updated: {lastUpdated}</p>
      <TextareaAutosize
        value={content}
        onChange={handleChange}
        minRows={10}
        className='text'
        style={{ width: '100%', fontSize: '1.1em' }}
      />
    </div>
  );
}

export default NoteEditor;
