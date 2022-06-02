const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.json());

let users = []
let messages = []
let todos = [{
  subject: 'Test subject I', tasks: [{
    author: '1', todo: 'abc', done: false, id: 1
  }, {
    author: '2', todo: 'vbn', done: true, id: 2
  },]
}, {
  subject: 'Test subject II', tasks: [{
    author: '1', todo: 'abc', done: false, id: 3
  }, {
    author: '2', todo: 'vbn', done: true, id: 4
  }, {
    author: '3', todo: 'mkj', done: false, id: 5
  },]
}]

app.post('/', (req, res) => {
  const { userName } = req.body
  if (!users.some(user => user.userName === userName)) {
    res.send()
    return
  }
  res.json(`User "${userName}" already online`)
})

io.on('connection', socket => {
  socket.on('USERS:JOIN', ({ userName }) => {
    users.push({ id: socket.id, userName })
    socket.broadcast.emit('USERS:SET_USERS', users);
    socket.emit('USERS:SET_USERS', users);
    socket.emit('USERS:ADD_MESSAGE', messages);
    socket.emit('TODO:SET_TODOS', todos);
  })

  socket.on('USERS:ADD_MESSAGE', ({ userName, message }) => {
    messages.unshift({ userName, message })
    if (messages.length === 50) {
      messages.pop()
    }
    socket.broadcast.emit('USERS:ADD_MESSAGE', messages);
    socket.emit('USERS:ADD_MESSAGE', messages);
  })

  socket.on('TODO:ADD_TODO', ({ task }) => {
    const index = todos.findIndex((todo) => todo.subject === task.subject);
    if (index < 0) {
      todos.push(task);
    } else {
      todos[index].tasks.push(task.tasks[0]);
    }
    socket.broadcast.emit('TODO:ADD_TODO', todos);
    socket.emit('TODO:ADD_TODO', todos);
  })

  socket.on('TODO:CHANGE_STATUS', ({ indexSubject, indexTask }) => {
    const newArr = [...todos];
    newArr[indexSubject].tasks[indexTask].done =
      !newArr[indexSubject].tasks[indexTask].done;
    todos = newArr
    socket.broadcast.emit('TODO:CHANGE_STATUS', todos);
    socket.emit('TODO:CHANGE_STATUS', todos);
  })

  socket.on('TODO:DELETE_TASK', ({ indexSubject, indexTask }) => {
    const newArr = todos[indexSubject].tasks.filter((_, i) => i !== indexTask)
    todos[indexSubject].tasks = newArr
    socket.broadcast.emit('TODO:DELETE_TASK', todos);
    socket.emit('TODO:DELETE_TASK', todos);
  })

  socket.on('TODO:DELETE_SUBJECT', ({ indexSubject }) => {
    const newArr = todos.filter((_, i) => i !== indexSubject)
    todos = newArr
    socket.broadcast.emit('TODO:DELETE_SUBJECT', todos);
    socket.emit('TODO:DELETE_SUBJECT', todos);
  })

  socket.on('disconnect', () => {
    users = users.filter((user) => {
      return user.id !== socket.id
    })
    socket.broadcast.emit('USERS:SET_USERS', users);
  })

  socket.on('USERS:LOG_OUT', ({ userName }) => {
    users = users.filter((user) => {
      return user.userName !== userName
    })
    socket.broadcast.emit('USERS:LOG_OUT', users);
  })

})

server.listen(3000, () => {
  console.log('server is running')
})
