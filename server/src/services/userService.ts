// src/services/userService.ts
import userModel from '../models/userModel';
import { User, CreateUserDto } from '../types';
import { ApiError } from '../middleware/errorHandler';

class UserService {
  async getAllUsers(): Promise<User[]> {
    return userModel.findAll();
  }

  async getUserById(id: string): Promise<User> {
    const user = await userModel.findById(id);
    if (!user) {
      const error: ApiError = new Error('User not found');
      error.statusCode = 404;
      error.code = 'USER_NOT_FOUND';
      throw error;
    }
    return user;
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    // Add validation logic here
    return userModel.create(userData);
  }
}

export default new UserService();

