import React, { useState } from 'react';
import { CreateUserDto } from '@/types';
import { userApi } from '../../api/api.ts';

interface UserFormProps {
  onUserCreated: () => void;
}

const UserForm = ({ onUserCreated }: UserFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Form validation
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required');
      return;
    }

    const userData: CreateUserDto = {
      name: name.trim(),
      email: email.trim(),
    };

    try {
      setIsSubmitting(true);
      await userApi.createUser(userData);
      // Reset form after successful submission
      setName('');
      setEmail('');
      onUserCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className=" p-5 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <div className="text-red-600 bg-red-50 p-2.5 rounded mb-4">{error}</div>}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-bold">Name:</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                required
                className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
                className="p-2 border border-gray-300 rounded"
            />
          </div>
          <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-4 bg-green-500 text-white rounded font-bold cursor-pointer hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding...' : 'Add User'}
          </button>
        </form>
      </div>
  );
};

export default UserForm;