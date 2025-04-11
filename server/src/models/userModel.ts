// src/models/userModel.ts
import { User } from '../types';

// This is a simple in-memory implementation - in a real app, 
// you'd connect to a database
class UserModel {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }
}

export default new UserModel();
