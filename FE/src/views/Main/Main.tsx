import Chat from '../../components/Chat/Chat';
import Users from '../../components/Users/Users';
import Todo from '../../components/Todo/Todo';
import { MessagesType, ToDoType, UsersType } from '../../assets/types/types';
import './Main.scss';

import { FC, memo } from 'react';

type MainProps = {
  userName: string;
  setView: (arr: string) => void;
  setUserName: (arr: string) => void;
  messages: MessagesType;
  users: UsersType;
  todos: ToDoType;
};

const Main: FC<MainProps> = ({
  userName,
  messages,
  setView,
  users,
  setUserName,
  todos,
}) => {
  return (
    <div className="main">
      <Users users={users} />
      <Todo
        setView={setView}
        setUserName={setUserName}
        userName={userName}
        todos={todos}
      />
      <Chat userName={userName} setView={setView} messages={messages} />
    </div>
  );
};

export default memo(Main);
