import { DB_HOST, DB_PORT, DB_DATABASE } from '@config';

export const dbConnection = {
  url: `mongodb+srv://dbUser:VBNMvbnm1!@task-ms-cluster.r0qwh9b.mongodb.net`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};