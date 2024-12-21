import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage';
import TodoDetailPage from './pages/TodoDetailPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoListPage />} />
      <Route path="/todo/:id" element={<TodoDetailPage />} />
    </Routes>
  );
};

export default App;
