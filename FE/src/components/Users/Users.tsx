import './Users.scss';

import { FC, memo } from 'react';

type UsersProps = {
  users: {
    userName: string;
    id: string;
  }[];
};

const Users: FC<UsersProps> = ({ users }) => {
  return (
    <section className="users">
      <h4>{`Online ${users.length} user${users.length === 1 ? '' : 's'}:`}</h4>
      <ul className="users__list">
        {users.map(({ userName, id }) => {
          return (
            <li className="users__user" key={id}>
              {userName}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default memo(Users);
