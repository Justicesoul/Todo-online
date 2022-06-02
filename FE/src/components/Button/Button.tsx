import { FC, memo } from 'react';

type ButtonProps = {
  onClick: () => void;
  children: string;
};

const Button: FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default memo(Button);
