import { HttpException } from '@exceptions/HttpException';
import { Task } from '@interfaces/task.interface';
import taskModel from '@models/task.model';
import { isEmpty } from '@utils/util';
import { CreateTaskDto } from '@/dtos/task.dto';
import { publishToQueue } from '@utils/rabbitMq';
import { log } from 'console';
import { logger } from '@/utils/logger';

class TaskService {
  public tasks = taskModel;

  public async findAllTasks(): Promise<Task[]> {
    const tasks: Task[] = await this.tasks.find();
    return tasks;
  }

  public async findTaskById(taskId: string): Promise<Task> {
    if (isEmpty(taskId)) throw new HttpException(400, "TaskId is empty");

    const findTask: Task = await this.tasks.findOne({ _id: taskId });
    if (!findTask) throw new HttpException(409, "task doesn't exist");

    return findTask;
  }

  public async createTask(taskData: CreateTaskDto): Promise<Task> {
    if (isEmpty(taskData)) throw new HttpException(400, "taskData is empty");
    
    const createTaskData: Task = await this.tasks.create(taskData);
    
    logger.debug("Creating task");
    // Add data to the queue
    await publishToQueue(createTaskData);

    return createTaskData;
  }

  public async updateTask(taskId: string, taskData: CreateTaskDto): Promise<Task> {
    if (isEmpty(taskData)) throw new HttpException(400, "taskData is empty");

    const updateTaskById: Task = await this.tasks.findByIdAndUpdate(taskId, { taskData });
    console.log("taskData : ", taskData);
    
    if (!updateTaskById) throw new HttpException(409, "Task doesn't exist");

    // Add data to the queue
    // await publishToQueue("updated-tasks", updateTaskById);

    return updateTaskById;
  }

  public async deleteTask(taskId: string): Promise<Task> {
    const deleteTaskById: Task = await this.tasks.findByIdAndDelete(taskId);
    if (!deleteTaskById) throw new HttpException(409, "task doesn't exist");
    
    // Add data to the queue
    // await publishToQueue("deleted-tasks", deleteTaskById);

    return deleteTaskById;
  }
}

export default TaskService;
