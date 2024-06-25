import { HttpException } from '@exceptions/HttpException';
import { Task } from '@interfaces/task.interface';
import taskModel from '@models/task.model';
import { isEmpty } from '@utils/util';
import { CreateTaskDto } from '@/dtos/task.dto';
import { publishToQueue } from '@utils/rabbitMq';
import { logger } from '@/utils/logger';
import MessageFormatter from '@/utils/messageFormatter';

class TaskService {
  public tasks = taskModel;

  public async findAllTasks(): Promise<Task[]> {
    try {
      const tasks: Task[] = await this.tasks.find();
      return tasks;
    } catch (error) {
      logger.error(`Error fetching all tasks: ${error.message}`);
      throw new HttpException(500, 'Internal Server Error');
    }
  }

  public async findTaskById(taskId: string): Promise<Task> {
    try {
      if (isEmpty(taskId)) throw new HttpException(400, 'TaskId is empty');

      const findTask: Task = await this.tasks.findOne({ _id: taskId });
      if (!findTask) throw new HttpException(409, "task doesn't exist");

      return findTask;
    } catch (error) {
      logger.error(`Error fetching task by ID: ${error.message}`);
      throw error instanceof HttpException ? error : new HttpException(500, 'Internal Server Error');
    }
  }

  public async createTask(taskData: CreateTaskDto): Promise<Task> {
    try {
      if (isEmpty(taskData)) throw new HttpException(400, 'taskData is empty');

      const createTaskData: Task = await this.tasks.create(taskData);

      const formattedTaskData = MessageFormatter.format(createTaskData, "Task Created");
      await publishToQueue(formattedTaskData);

      return createTaskData;
    } catch (error) {
      logger.error(`Error creating task: ${error.message}`);
      throw new HttpException(500, 'Internal Server Error');
    }
  }

  public async updateTask(taskId: string, taskData: CreateTaskDto): Promise<Task> {
    try {
      if (isEmpty(taskData)) throw new HttpException(400, 'taskData is empty');

      const updateTaskById: Task = await this.tasks.findByIdAndUpdate(taskId, { taskData });
      console.log('taskData : ', taskData);

      if (!updateTaskById) throw new HttpException(409, "Task doesn't exist");

      const formattedTaskData = MessageFormatter.format(updateTaskById, "Task Updated");
      await publishToQueue(formattedTaskData);

      return updateTaskById;
    } catch (error) {
      logger.error(`Error updating task: ${error.message}`);
      throw error instanceof HttpException ? error : new HttpException(500, 'Internal Server Error');
    }
  }

  public async deleteTask(taskId: string): Promise<Task> {
    try {
      const deleteTaskById: Task = await this.tasks.findByIdAndDelete(taskId);
      if (!deleteTaskById) throw new HttpException(409, "task doesn't exist");

      const formattedTaskData = MessageFormatter.format(deleteTaskById, "Task Deleted");
      await publishToQueue(formattedTaskData);

      return deleteTaskById;
    } catch (error) {
      logger.error(`Error deleting task: ${error.message}`);
      throw error instanceof HttpException ? error : new HttpException(500, 'Internal Server Error');
    }
  }
}

export default TaskService;
