const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');
const Note = require('./models/Note');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());
app.use('/notes', require('./routes/notes'));

// Active users map
const activeUsers = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_note', (noteId) => {
    socket.join(noteId);

    if (!activeUsers[noteId]) activeUsers[noteId] = new Set();
    activeUsers[noteId].add(socket.id);

    io.to(noteId).emit('active_users', activeUsers[noteId].size);

    socket.on('note_update', ({ noteId, content }) => {
      socket.to(noteId).emit('note_update', content);

      Note.findByIdAndUpdate(noteId, {
        content,
        updatedAt: new Date()
      }).exec();
    });

    socket.on('disconnect', () => {
      if (activeUsers[noteId]) {
        activeUsers[noteId].delete(socket.id);
        io.to(noteId).emit('active_users', activeUsers
            [noteId].size);
      }
    });
  });
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
});
