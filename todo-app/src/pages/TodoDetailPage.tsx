import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { fetchTodos, updateTodoProgress } from '../store/todoSlice';
import { SOCKET_EVENTS, ISocketTodoProgressData } from '../utils/socketEvents';
import socket from '../utils/socket';
import ProgressBar from '../components/ProgressBar';

const TodoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { todos, loading } = useSelector((state: RootState) => state.todos);
  const todo = todos.find(t => t._id === id);

  useEffect(() => {
    if (!todos.length) {
      dispatch(fetchTodos());
    }

    const handleProgressUpdate = (data: ISocketTodoProgressData) => {
      if (data._id === id) {
        dispatch(updateTodoProgress(data));
      }
    };

    socket.on(SOCKET_EVENTS.UPDATE_TODO_PROGRESS, handleProgressUpdate);

    return () => {
      socket.off(SOCKET_EVENTS.UPDATE_TODO_PROGRESS, handleProgressUpdate);
    };
  }, [dispatch, id, todos.length]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (!todo) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Todo not found
        </div>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{todo.name}</h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Description:</h2>
          <p className="text-gray-600">{todo.description}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Progress:</h2>
          <div className="w-full">
            <ProgressBar 
              progress={todo.progress} 
              size="large"
              showLabel={true}
            />
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default TodoDetailPage; 