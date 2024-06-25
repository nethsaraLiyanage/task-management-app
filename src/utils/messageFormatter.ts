import { Task } from "@/interfaces/task.interface";

class MessageFormatter {
    static format(task: Task, message: string): any {
      return {
        customMessage: `${message} | {id: ${task._id}, title: ${task.title}, description: ${task.description}, status: ${task.status}}`,
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
      };
    }
}


export default MessageFormatter;
  