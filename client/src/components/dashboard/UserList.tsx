import { useState, useEffect } from 'react';
import { User } from '@/types';
import { userApi } from '@/api/api.ts';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userApi.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-5 text-center">Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-600 bg-red-50 p-2.5 rounded mb-4">Error: {error}</div>;
  }

  if (users.length === 0) {
    return <div className=" p-5 rounded-lg shadow text-center">No users found. Add a new user to get started.</div>;
  }

  return (
      <div className="p-5 rounded-lg shadow">
        <h2 className="text-xl font-bold mt-0 mb-4">Users</h2>
        <button
            onClick={fetchUsers}
            className="py-1 px-2.5 bg-blue-500 text-white rounded cursor-pointer mb-2.5 hover:bg-blue-600"
        >
          Refresh
        </button>
        <ul className="list-none p-0">
          {users.map((user) => (
              <li key={user.id} className="p-4 border-b border-gray-300 last:border-b-0">
                <strong>{user.name}</strong> ({user.email})
                <div className="text-sm text-gray-500 mt-1">
                  Created: {new Date(user.createdAt).toLocaleString()}
                </div>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default UserList;