const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const TodoSchema = require('./schemas/TodoSchema');

const PORT = process.env.PORT || 3333;
const app = express();

const corsOptions = {
  origin: 'http://127.0.0.1:5173',
};

app.use(cors(corsOptions));
0;
app.use(express.json());

mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.souffus.mongodb.net/todo-api?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Erro na conexão com o MongoDB:', error);
});

db.on('open', () => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
});

app.get('/', (request, response) => {
  return response.json({
    message: 'Seja bem vindo à API do TODO - Ewerton Lopes!😉',
  });
});

//get all
app.get('/tarefas', async (request, response) => {
  try {
    const tarefas = await TodoSchema.find();
    response.json(tarefas);
  } catch (error) {
    response
      .status(500)
      .json({ mensagem: 'Erro ao obter as tarefas do banco de dados.' });
  }
});

//get by id
app.get('/tarefas/:id', async (request, response) => {
  const id = request.params.id;

  const res = await TodoSchema.findById(id);

  if (!res) {
    return response.status(404).json({ message: 'Tarefa não encontrada' });
  }
  return response.json(res);
});

// post
app.post('/tarefas', async (request, response) => {
  try {
    const novaTarefa = await TodoSchema.create(request.body);
    response.json(novaTarefa);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar uma nova tarefa.' });
  }
});

//delete
app.delete('/tarefas/:id', async (request, response) => {
  const id = request.params.id;
  try {
    await TodoSchema.findByIdAndRemove(id);
    response.json({ mensagem: 'Tarefa excluída com sucesso!' });
  } catch (error) {
    response
      .status(500)
      .json({ mensagem: 'Erro ao excluir a tarefa do banco de dados.' });
  }
});

//put
app.put('/tarefas/:id', async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  try {
    const tarefa = await TodoSchema.findByIdAndUpdate({ _id: id }, body);
    return response.json(tarefa);
  } catch (error) {
    return response
      .status(500)
      .json({
        mensagem: 'Erro ao atualizar o status da tarefa no banco de dados.',
      });
  }
});

app.listen(PORT, () =>
  console.log('Servidor iniciado com sucesso na porta:' + PORT)
);
