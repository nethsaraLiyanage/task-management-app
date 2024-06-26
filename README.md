
## ⚒ How to RUN

On Local device : 
- **Using Docker** 
    - If you need to run the application using docker, you have to use the `.env.production.local` file.
    - Make sure the `target` of the server build is set to `production-build-stage`
    - run the command `docker-compose up`
    
- **Using NODEMON** 
    - If you need to run the application using npm, you have to use the `.env.development.local` file.
    - for this we are using the MongoDB Atlas and the Heroku Deployed RabbitMQ instance.
    - run the command `npm run dev`

=======================================================================================================================================

## Heroku URL
 - APP_URL = https://task-management-app-ses-1c5db74458ed.herokuapp.com/
 - SWAGGER_URL = https://task-management-app-ses-1c5db74458ed.herokuapp.com/api-docs/

- **NOTES** - Heroku doesn't support DOCKER COMPOSE with RabbitMQ and MongoDB. So I used MongoDB cloud for the heroku deployment and RabbitMQ Add-on called "CloudAMQP" for the deployment. 



=======================================================================================================================================

## Configurations

### Database Configuration
- **DB_HOST=** 127.0.0.1
- **DB_PORT=** 27017
- **DB_DATABASE=** dev
- **LOG_FORMAT=** dev
- **LOG_DIR=** ../logs

### RabbitMQ Configuration
- **RABBITMQ_URL=** amqp://rabbitmq
- **QUEUE_NAME=** task_queue