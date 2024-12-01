const users = [
    {
        email: 'jose@yahoo.com',
        password: 'csc481',
        name: 'Jose',
        role: 'user',
        events: [],
        invites: [],
        messages: []
    },
    {
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Admin',
        role: 'admin',
        events: [],
        invites: [],
        messages: []
    },
    {
        email: 'test@test.com',
        password: 'test123',
        name: 'Test User',
        role: 'user',
        events: [],
        invites: [],
        messages: []
    }
];

export default users;

/*
Elizabeth: I was trying to see if could pull from the backend but I got stuck
import { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.user_id} className="border p-4 rounded-lg shadow">
            <div className="font-semibold">{user.first_name} {user.last_name}</div>
            <div className="text-gray-600">{user.email}</div>
            <div className="text-sm">{user.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;*/