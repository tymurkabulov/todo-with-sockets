export const SOCKET_EVENTS = {
  UPDATE_TODO_PROGRESS: 'update-todo-progress',
  CONNECT_ERROR: 'connect_error',
  CONNECT: 'connect',
  DISCONNECT: 'disconnect'
} as const;

export interface ISocketTodoProgressData {
  _id: string;
  progress: number;
}