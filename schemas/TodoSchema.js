const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
  descricao: String,
});

module.exports = model('Todo', TodoSchema);
