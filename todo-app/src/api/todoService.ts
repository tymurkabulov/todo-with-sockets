interface TodoInput {
  _id: string;
  name: string;
  description: string;
  progress: number;
}

const API_BASE = 'http://localhost:8000/api';

export const createTodo = async (todo: TodoInput) => {
  const response = await fetch(`${API_BASE}/todos`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      _id: todo._id,
      name: todo.name,
      description: todo.description,
      progress: todo.progress
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create todo');
  }

  return await response.json();
};

export const updateTodo = async (todo: { _id: string; name: string; description: string; progress: number }) => {
  const response = await fetch(`${API_BASE}/todos`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const deleteTodo = async (id: string) => {
  const response = await fetch(`${API_BASE}/todos/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete todo');
  }

  return await response.json();
};

export const fetchTodos = async () => {
  const response = await fetch(`${API_BASE}/todos`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
};
  