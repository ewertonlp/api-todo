const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
});

module.exports = model('Todo', TodoSchema);