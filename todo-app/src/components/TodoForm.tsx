import React, { useState } from 'react';

interface TodoFormProps {
  onSubmit: (name: string, description: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    onSubmit(name.trim(), description.trim());
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Todo</button>
    </form>
  );
};

export default TodoForm;