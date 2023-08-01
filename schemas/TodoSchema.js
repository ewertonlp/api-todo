const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
  descricao: String,
  isComplete: Boolean,
});

module.exports = model('Todo', TodoSchema);
