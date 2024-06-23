import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import TaskRoute from './routes/task.route';

validateEnv();

const app = new App([new IndexRoute(), new TaskRoute]);

app.listen();
