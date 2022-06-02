import './Todo.scss';
import Button from '../Button/Button';
import deleteIcon from '../../assets/images/clear.svg';
import garbageIcon from '../../assets/images/garbage.png';
import { ToDoType } from '../../assets/types/types';

import { FC, memo, useState } from 'react';
import socket from '../../utils/socket';
import CreateNewTask from '../CreateNewTask/CreateNewTask';

type TodoProps = {
  setView: (arr: string) => void;
  userName: string;
  setUserName: (arr: string) => void;
  todos: ToDoType;
};

const Todo: FC<TodoProps> = ({ setView, userName, setUserName, todos }) => {
  const [showCompleted, setShowCompleted] = useState(true);
  const [showPending, setShowPending] = useState(true);
  const [createTask, setCreateTask] = useState(false);

  const onLogOut = () => {
    socket.emit('USERS:LOG_OUT', { userName });
    setView('form');
    setUserName('');
  };

  const toggleCompletedTasks = () => {
    setShowCompleted(!showCompleted);
  };

  const togglePendingTasks = () => {
    setShowPending(!showPending);
  };

  const toggleNewTaskMenu = () => {
    setCreateTask(!createTask);
  };

  const onChangeTaskStatus = (indexSubject: number, indexTask: number) => {
    socket.emit('TODO:CHANGE_STATUS', { indexSubject, indexTask });
  };

  const onDeleteTask = (indexSubject: number, indexTask: number) => {
    socket.emit('TODO:DELETE_TASK', { indexSubject, indexTask });
  };

  const onDeleteSubject = (indexSubject: number) => {
    socket.emit('TODO:DELETE_SUBJECT', { indexSubject });
  };

  return (
    <main className="todo">
      <h2 className="todo__heading">ToDo</h2>
      <div className="todo__menu">
        <Button onClick={toggleNewTaskMenu}>Create a task</Button>
        <Button onClick={toggleCompletedTasks}>
          {`${showCompleted ? 'Hide' : 'Show'} complited`}
        </Button>
        <Button onClick={togglePendingTasks}>
          {`${showPending ? 'Hide' : 'Show'} pending`}
        </Button>
        <button className="button todo__logout-button" onClick={onLogOut}>
          Log out
        </button>
      </div>
      <div className="todo__wrapper">
        {todos.map(({ subject, tasks }, indexSubject) => {
          return (
            <div key={subject} className="todo__subjects">
              <img
                className="todo__delete-icon"
                src={garbageIcon}
                alt="delete"
                onClick={() => onDeleteSubject(indexSubject)}
              />
              <h3 className="todo__subject-heading">{subject}</h3>
              <div className="todo__todos">
                {tasks
                  .filter(({ done }) => !done || showCompleted)
                  .filter(({ done }) => done || showPending)
                  .map(({ author, done, id, todo }, indexTask) => {
                    return (
                      <div
                        className="todo__task"
                        key={id}
                        style={{
                          backgroundColor: done
                            ? 'rgba(107, 250, 0, 0.25)'
                            : 'rgba(250, 38, 0, 0.25)',
                        }}
                      >
                        <div
                          onClick={() => onDeleteTask(indexSubject, indexTask)}
                          className="todo__delete-todo"
                        >
                          {' '}
                          <img src={deleteIcon} alt="delete" />
                        </div>
                        <h4 className="todo__task-author">Author: {author}</h4>
                        <p className="todo__task-text">Task: {todo}</p>
                        <h4 className="todo__task-status">
                          {`Status: ${done ? 'completed' : 'pending'} `}
                          <span
                            onClick={() =>
                              onChangeTaskStatus(indexSubject, indexTask)
                            }
                            className="todo__task-status--change"
                          >
                            (change)
                          </span>
                        </h4>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
      {createTask && (
        <CreateNewTask
          todos={todos}
          createTask={createTask}
          setCreateTask={setCreateTask}
          userName={userName}
        />
      )}
    </main>
  );
};

export default memo(Todo);
