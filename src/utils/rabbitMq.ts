// rabbitmq.ts
import * as amqp from 'amqplib';
import { RABBITMQ_URL } from '@config';

class RabbitMQ {
  private static instance: RabbitMQ;
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  private constructor() {}

  public static async getInstance() {
    if (!RabbitMQ.instance) {
      RabbitMQ.instance = new RabbitMQ();
      await RabbitMQ.instance.connect();
    }
    return RabbitMQ.instance;
  }

  private async connect() {
    this.connection = await amqp.connect(RABBITMQ_URL);
    this.channel = await this.connection.createChannel();
  }

  public async publish(queue: string, message: any) {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  }
}

export default RabbitMQ;
