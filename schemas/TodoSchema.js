const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  descricao: {
    type: String,
    required: true,
  },
});

module.exports = model('Todo', todoSchema);
