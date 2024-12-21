import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TodoType } from '../types/index';

interface TodoState {
  todos: TodoType[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('http://localhost:8000/api/todos');
  const data = await response.json();
  return data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo._id !== action.payload);
    },
    updateTodoInList: (state, action: PayloadAction<TodoType>) => {
      const index = state.todos.findIndex(todo => todo._id === action.payload._id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    updateTodoProgress: (state, action: PayloadAction<{ _id: string; progress: number }>) => {
      state.todos = state.todos.map((todo) =>
        todo._id === action.payload._id
          ? { ...todo, progress: action.payload.progress }
          : todo
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch todos';
      });
  },
});

export const { addTodo, removeTodo, updateTodoInList, updateTodoProgress } = todoSlice.actions;
export default todoSlice.reducer;
