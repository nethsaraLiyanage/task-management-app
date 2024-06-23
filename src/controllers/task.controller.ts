import { NextFunction, Request, Response } from 'express';
import { Task } from '@interfaces/task.interface';
import taskService from '@services/task.service';
import { CreateTaskDto } from '@/dtos/task.dto';

class TaskController {
  public taskService = new taskService();

  public getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllTasksData: Task[] = await this.taskService.findAllTasks();

      res.status(200).json({ data: findAllTasksData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId: string = req.params.id;
      const findOneTaskData: Task = await this.taskService.findTaskById(taskId);

      res.status(200).json({ data: findOneTaskData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskData: CreateTaskDto = req.body;
      const createTaskData: Task = await this.taskService.createTask(taskData);

      res.status(201).json({ data: createTaskData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId: string = req.params.id;
      const taskData: CreateTaskDto = req.body;
      const updateTaskData: Task = await this.taskService.updateTask(taskId, taskData);

      res.status(200).json({ data: updateTaskData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId: string = req.params.id;
      const deleteTaskData: Task = await this.taskService.deleteTask(taskId);

      res.status(200).json({ data: deleteTaskData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default TaskController;
