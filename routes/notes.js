const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {readFromFile,readAndAppend} = require('../helpers/fsUtils');

// GET Route for reading notes from file
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => {
    res.json(JSON.parse(data));
  })
});

// GET Route for note
notes.get('/:text', (req, res) => {
  const ID = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === ID);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const {title, text} = req.body;

  if (req.body) {
    const newNote = {title,text,id: uuidv4()};

    readAndAppend(newNote, './db/db.json');
    res.json(`Note documented successfully`);
  } else {
    res.error('Error note could not documented');
  }
});
module.exports = notes;