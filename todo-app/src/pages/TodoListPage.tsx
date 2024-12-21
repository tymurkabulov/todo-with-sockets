import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchTodos, updateTodoProgress } from '../store/todoSlice';
import { RootState, useAppDispatch } from '../store';
import TodoCard from '../components/TodoCard';
import TodoForm from '../components/TodoForm';
import { useTodoActions } from '../hooks/useTodoActions';
import socket from '../utils/socket';
import { SOCKET_EVENTS, ISocketTodoProgressData } from '../utils/socketEvents';

const TodoListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);

  
  const { handleAddTodo, handleUpdateTodo, handleDeleteTodo } = useTodoActions();

  
  useEffect(() => {
    dispatch(fetchTodos());

    const handleProgressUpdate = (data: ISocketTodoProgressData) => {
      dispatch(updateTodoProgress(data));
    };

    socket.on(SOCKET_EVENTS.UPDATE_TODO_PROGRESS, handleProgressUpdate);

    return () => {
      socket.off(SOCKET_EVENTS.UPDATE_TODO_PROGRESS, handleProgressUpdate);
    };
  }, [dispatch]);

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => dispatch(fetchTodos())}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoForm onSubmit={handleAddTodo} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {todos.map((todo) => (
            <TodoCard
              key={todo._id}
              id={todo._id}
              name={todo.name}
              description={todo.description}
              progress={todo.progress}
              onEdit={(newName, newDescription) =>
                handleUpdateTodo(todo._id, newName, newDescription, todo.progress)
              }
              onDelete={() => handleDeleteTodo(todo._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoListPage;
