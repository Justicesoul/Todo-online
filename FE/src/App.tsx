import './App.scss';
import Header from './components/Header/Header';
import Form from './views/Form/Form';
import Main from './views/Main/Main';
import socket from './utils/socket';

import { memo, useEffect, useState } from 'react';

const App = () => {
  const [view, setView] = useState('form');
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    socket.on('USERS:ADD_MESSAGE', (data) => {
      setMessages(data);
    });
    socket.on('USERS:SET_USERS', (data) => {
      setUsers(data);
    });
    socket.on('USERS:LOG_OUT', (data) => {
      setUsers(data);
    });
    socket.on('TODO:SET_TODOS', (data) => {
      setTodos(data);
    });
    socket.on('TODO:ADD_TODO', (data) => {
      setTodos(data);
    });
    socket.on('TODO:CHANGE_STATUS', (data) => {
      setTodos(data);
    });
    socket.on('TODO:DELETE_TASK', (data) => {
      setTodos(data);
    });
    socket.on('TODO:DELETE_SUBJECT', (data) => {
      setTodos(data);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      {view === 'form' && (
        <Form userName={userName} setUserName={setUserName} setView={setView} />
      )}
      {view === 'main' && (
        <Main
          userName={userName}
          setUserName={setUserName}
          setView={setView}
          messages={messages}
          users={users}
          todos={todos}
        />
      )}
    </div>
  );
};

export default memo(App);
