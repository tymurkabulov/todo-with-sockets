export interface Todo {
  _id: string;
  name: string;
  description: string;
  progress: number;
}

export interface CreateTodoInput {
  name: string;
  description: string;
  progress: number;
}

export interface UpdateTodoInput extends CreateTodoInput {
  _id: string;
} 