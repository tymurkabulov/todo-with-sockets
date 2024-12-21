export interface TodoType {
  _id: string;
  name: string;
  description: string;
  progress: number;
}

export interface ISocketTodoProgressData {
  _id: string;
  progress: number;
} 