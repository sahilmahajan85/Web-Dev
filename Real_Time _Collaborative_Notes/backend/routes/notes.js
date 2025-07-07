const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Create note
router.post('/', async (req, res) => {
  const note = new Note({ title: req.body.title });
  await note.save();
  res.status(201).json(note);
});

// Get note by ID
router.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
});

// Update note content
router.put('/:id', async (req, res) => {
  const { content } = req.body;
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    { content, updatedAt: new Date() },
    { new: true }
  );
  res.json(note);
});

module.exports = router;
