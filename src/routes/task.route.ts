import { Router } from 'express';
import TaskController from '@controllers/task.controller';
import { CreateTaskDto } from '@dtos/task.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class TaskRoute implements Routes {
  public path = '/task';
  public router = Router();
  public taskController = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.taskController.getAllTasks);
    this.router.get(`${this.path}/:id`, this.taskController.getTaskById);
    this.router.post(`${this.path}`, validationMiddleware(CreateTaskDto, 'body'), this.taskController.createTask);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateTaskDto, 'body', true), this.taskController.updateTask);
    this.router.delete(`${this.path}/:id`, this.taskController.deleteTask);
  }
}

export default TaskRoute;
