import './Form.scss';
import socket from '../../utils/socket';
import clearIcon from '../../assets/images/clear.svg';
import Button from '../../components/Button/Button';

import { ChangeEvent, FC, FormEvent, memo, useCallback, useState } from 'react';

import axios from 'axios';

type FormProps = {
  userName: string;
  setUserName: (arr: string) => void;
  setView: (arr: string) => void;
};

const Form: FC<FormProps> = ({ userName, setUserName, setView }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const enterUserName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUserName(e.target.value);
      setErrorMessage('');
    },
    [setUserName]
  );

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userName.trim().length === 0) {
      setErrorMessage('Please enter your username');
      return;
    }

    axios.post('http://localhost:3001', { userName }).then((res) => {
      if (res.data) {
        setErrorMessage(res.data);
        return;
      }
      setView('main');
      socket.emit('USERS:JOIN', { userName });
    });
  };

  return (
    <form className="form" onSubmit={onFormSubmit}>
      <div className="form__wrapper">
        <label className='form__label'>
          <input
            className="form__input"
            type="text"
            placeholder="Enter your username"
            value={userName}
            onChange={enterUserName}
            maxLength={20}
          />
          <button
            type="reset"
            className="form__clear-input"
            onClick={() => setUserName('')}
          >
            <img
              className="form__clear-input-icon"
              src={clearIcon}
              alt="clear"
            />
          </button>
        </label>
        <Button onClick={() => {}}>Submit</Button>
        <h4 className="form__error-message">{errorMessage}</h4>
      </div>
    </form>
  );
};

export default memo(Form);
