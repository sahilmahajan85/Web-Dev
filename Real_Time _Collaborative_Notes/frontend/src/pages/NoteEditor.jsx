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

  // Fetch initial note data
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/notes/${id}`);
        setContent(res.data.content);
        setTitle(res.data.title);
        setLastUpdated(new Date(res.data.updatedAt).toLocaleTimeString());
      } catch (err) {
        console.error('Error fetching note:', err);
      }
    };
    fetchNote();

    // Join socket room
    socket.emit('join_note', id);

    // Receive real-time updates
    socket.on('note_update', (newContent) => {
      setContent(newContent);
    });

    // Track active users
    socket.on('active_users', (count) => {
      setActiveUsers(count);
    });

    // Cleanup on unmount
    return () => {
      socket.off('note_update');
      socket.off('active_users');
    };
  }, [id]);

  // Handle content change
  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    socket.emit('note_update', { noteId: id, content: newContent });

    // Auto-save to DB every 5 seconds
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      axios
        .put(`${import.meta.env.VITE_API_URL}/notes/${id}`, { content: newContent })
        .then(() => setLastUpdated(new Date().toLocaleTimeString()))
        .catch((err) => console.error('Auto-save error:', err));
    }, 5000);
  };

  return (
    <div className='note'>
      <h2>{title || 'Untitled Note'}</h2>
      <p> Active Users: {activeUsers}</p>
      <p> Last Updated: {lastUpdated}</p>
      <TextareaAutosize
        value={content}
        onChange={handleChange}
        minRows={10}
        placeholder="Start typing your collaborative note..."
        className='text'
        style={{ width: '100%', fontSize: '1.1em' }}
      />
    </div>
  );
}

export default NoteEditor;
