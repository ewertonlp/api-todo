const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  descricao: {
    type: String,
    required: true,
  },
  concluido: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('Todo', todoSchema);
