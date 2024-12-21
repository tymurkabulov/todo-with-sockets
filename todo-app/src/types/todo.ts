export interface ITodo {
  _id: string;
  name: string;
  description: string;
  progress: number;
}

export interface IDefaultResponse {
  success: boolean;
  message: string;
} 