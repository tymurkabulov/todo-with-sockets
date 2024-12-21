import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './common/Button';
import ProgressBar from './ProgressBar';

interface TodoCardProps {
  id: string;
  name: string;
  description: string;
  progress: number;
  onEdit: (name: string, description: string) => void;
  onDelete: () => void;
}

const TodoCard: React.FC<TodoCardProps> = React.memo(({
  id,
  name,
  description,
  progress,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      return;
    }
    onEdit(editName.trim(), editDescription.trim());
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            placeholder="Task name"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            placeholder="Description"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold text-lg mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-4">
        <ProgressBar 
          progress={progress} 
          size="small"
          showLabel={false}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Link to={`/todo/${id}`}>
          <Button variant="secondary">Details</Button>
        </Link>
        <Button 
          variant="primary" 
          onClick={() => setIsEditing(true)}
        >
          Edit
        </Button>
        <Button 
          variant="danger" 
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
});

export default TodoCard;