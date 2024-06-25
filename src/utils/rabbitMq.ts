import amqplib from 'amqplib';
import { logger } from './logger';
import { RABBITMQ_URL,QUEUE_NAME } from '@config';

const rabbitMQUrl = RABBITMQ_URL;
const queueName = QUEUE_NAME;

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

    await channel.assertQueue(queueName, { durable: true });
    console.log(` [*] Waiting for messages in ${queueName}. To exit press CTRL+C`);

    channel.consume(queueName, (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        console.log(" [x] Received '%s'", messageContent);

        // Log the consumed message using the logger
        console.log(`Consumed message from ${queueName}: ${messageContent}`);
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