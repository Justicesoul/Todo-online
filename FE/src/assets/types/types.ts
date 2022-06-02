export type ToDoType = {
  subject: string;
  tasks: {
    author: string;
    todo: string;
    done: boolean;
    id: number;
  }[];
}[];

export type MessagesType = {
  userName: string;
  message: string;
}[];

export type UsersType = {
  userName: string;
  id: string;
}[];