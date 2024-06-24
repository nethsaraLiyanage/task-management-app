import amqplib from 'amqplib';

const rabbitMQUrl = 'amqp://localhost'; // Replace with your actual RabbitMQ URL
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