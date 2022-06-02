import socket from '../../utils/socket';
import './Chat.scss';
import Button from '../Button/Button';

import { ChangeEvent, FC, memo, useCallback, useState } from 'react';

type ChatProps = {
  userName: string;
  setView: (arr: string) => void;
  messages: {
    userName: string;
    message: string;
  }[];
};

const Chat: FC<ChatProps> = ({ userName, messages }) => {
  const [message, setMessage] = useState('');

  const enterMessage = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('USERS:ADD_MESSAGE', {
        userName,
        message,
      });
      setMessage('');
    }
  };

  return (
    <section className="chat">
      <textarea
        className="chat__textarea"
        placeholder="Enter your message"
        value={message}
        onChange={enterMessage}
        rows={3}
      />
      <Button onClick={sendMessage}>Send a message</Button>
      <div className="chat__messages">
        {messages.map(({ userName, message }, index) => {
          return (
            <div className="chat__message-container" key={message + index}>
              <h6 className="chat__message-author">{userName}</h6>
              <p className="chat__message-text">{message}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default memo(Chat);
