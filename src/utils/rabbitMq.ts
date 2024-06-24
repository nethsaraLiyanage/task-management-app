import amqplib from 'amqplib';
import { logger } from './logger';

const rabbitMQUrl = 'amqps://tkjtysey:4TdwDSrMv9AMuTlJ2-d5V0gwLQLMNLZO@moose.rmq.cloudamqp.com/tkjtysey';
const queueName = 'task_queue';

export async function publishToQueue(message: any): Promise<void> {
  try {
    const connection = await amqplib.connect(rabbitMQUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true });

    console.log(" [x] Sent '%s'", message);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
  }
}

export async function consumeMessages(): Promise<void> {
  try {
    const connection = await amqplib.connect(rabbitMQUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue({ durable: true });
    console.log(` [*] Waiting for messages in ${queueName}. To exit press CTRL+C`);

    channel.consume(queueName, (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        console.log(" [x] Received '%s'", messageContent);

        // Log the consumed message using the logger
        logger.info(`Consumed message from ${queueName}: ${messageContent}`);

        channel.ack(msg);
      }
    }, {
      noAck: false
    });
  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
  }
}