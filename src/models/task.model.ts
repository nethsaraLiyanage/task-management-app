import { model, Schema, Document } from 'mongoose';
import { Task } from '@interfaces/task.interface';

const taskSchema: Schema = new Schema({
    title : {
        type : String,
        required : true
    },
    description  : {
        type : String,
        required : false,
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const taskModel = model<Task & Document>('Task', taskSchema);

export default taskModel;
