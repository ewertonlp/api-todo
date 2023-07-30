const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
  descricao: {
    type: String,
    required: true,
  },
});

module.exports = model('Todo', TodoSchema);
