// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';
import { CreateUserDto } from '../types';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData: CreateUserDto = req.body;
    const newUser = await userService.createUser(userData);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    next(error);
  }
};

