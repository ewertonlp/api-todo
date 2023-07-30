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

app.use(cors());
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
  const res = await TodoSchema.find();
  return response.json(res);
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
  const res = await TodoSchema.create(request.body);
  return response.status(201).json(res);
});

//delete
app.delete('/tarefas/:id', async (request, response) => {
  const id = request.params.id;
  try {
    await TodoSchema.findByIdAndRemove(id);
    return response.status(204).json();
  } catch (error) {
    return response.status(500);
  }
});

//put
app.put('/tarefas/:id', async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  try {
    const res = await TodoSchema.findByIdAndUpdate({ _id: id }, body);
    return response.json(res);
  } catch (error) {
    return response.status(500);
  }
});

app.listen(PORT, () =>
  console.log('Servidor iniciado com sucesso em http://localhost:' + PORT)
);
