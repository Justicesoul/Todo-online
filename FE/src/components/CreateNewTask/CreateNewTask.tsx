import './CreateNewTask.scss';
import Button from '../Button/Button';

import { FC, memo, useState } from 'react';
import socket from '../../utils/socket';

type NewTaskProps = {
  todos: {
    subject: string;
    tasks: {
      author: string;
      todo: string;
      done: boolean;
      id: number;
    }[];
  }[];
  createTask: boolean;
  userName: string;
  setCreateTask: (arr: boolean) => void;
};

const CreateNewTask: FC<NewTaskProps> = ({
  todos,
  setCreateTask,
  createTask,
  userName,
}) => {
  const [newTaskSubject, setNewTaskSubject] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [taskSubject, setTaskSubject] = useState('');
  const [error, setError] = useState(false);

  const onCreateTaskHandler = () => {
    const task = {
      subject: taskSubject,
      tasks: [
        {
          todo: newTaskText,
          done: false,
          id: Math.random(),
          author: userName,
        },
      ],
    };
    if (!newTaskText || !taskSubject || taskSubject === '- Choose subject -') {
      setError(true);
    } else {
      socket.emit('TODO:ADD_TODO', {
        task,
      });
      setError(false);
      setCreateTask(!createTask);
    }
  };

  return (
    <section className="new-task">
      <div className="new-task__form">
        <h3 className="new-task__heading">Create new task</h3>
        <label className="new-task__label">
          {newTaskSubject ? 'Create' : 'Choose'} task subject or{' '}
          <span
            className="new-task__label--anchor"
            onClick={() => {
              setNewTaskSubject(!newTaskSubject);
              setTaskSubject('');
            }}
          >
            {newTaskSubject ? 'choose from the list' : 'create new one'}:
          </span>
          {newTaskSubject && (
            <input
              type="text"
              className="new-task__input"
              placeholder="Write a subject"
              value={taskSubject}
              onChange={(e) => setTaskSubject(e.target.value)}
            />
          )}
          {!newTaskSubject && (
            <select
              className="new-task__input"
              value={taskSubject}
              onChange={(e) => setTaskSubject(e.target.value)}
            >
              <option>- Choose subject -</option>
              {todos.map(({ subject }, index) => {
                return (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                );
              })}
            </select>
          )}
        </label>
        <label className="new-task__label">
          Write a task:
          <input
            type="text"
            className="new-task__input"
            placeholder="Write a task"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
        </label>
        {error && (
          <h4 className="new-task__error">Please fill all the fields</h4>
        )}
        <div>
          <Button onClick={onCreateTaskHandler}>Create</Button>
          <Button onClick={() => setCreateTask(!createTask)}>Cancel</Button>
        </div>
      </div>
    </section>
  );
};

export default memo(CreateNewTask);
