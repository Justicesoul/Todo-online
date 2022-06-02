import Chat from '../../components/Chat/Chat';
import Users from '../../components/Users/Users';
import Todo from '../../components/Todo/Todo';
import './Main.scss';

import { FC, memo } from 'react';

type MainProps = {
  userName: string;
  setView: (arr: string) => void;
  setUserName: (arr: string) => void;
  messages: {
    userName: string;
    message: string;
  }[];
  users: {
    userName: string;
    id: string;
  }[];
  todos: {
    subject: string;
    tasks: {
      author: string;
      todo: string;
      done: boolean;
      id: number;
    }[];
  }[];
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
