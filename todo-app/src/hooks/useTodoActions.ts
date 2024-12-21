import { useState } from 'react';
import { useAppDispatch } from '../store';
import { addTodo, removeTodo, updateTodoInList } from '../store/todoSlice';
import { createTodo, updateTodo, deleteTodo } from '../api/todoService';

export const useTodoActions = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const handleAddTodo = async (name: string, description: string) => {
    try {
      const newTodo = {
        _id: crypto.randomUUID(),
        name,
        description,
        progress: 0,
      };
      
      await createTodo(newTodo);
      dispatch(addTodo(newTodo));
      setError(null);
    } catch (err) {
      setError('Failed to create todo');
      console.error(err);
    }
  };

  const handleUpdateTodo = async (id: string, name: string, description: string, progress: number) => {
    try {
      const updatedTodo = {
        _id: id,
        name,
        description,
        progress,
      };
      await updateTodo(updatedTodo);
      dispatch(updateTodoInList(updatedTodo));
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      dispatch(removeTodo(id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  return {
    error,
    handleAddTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
};
