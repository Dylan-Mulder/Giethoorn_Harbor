amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:password@localhost:5672', (error, connection) => {
  if (error) throw error;

  connection.createChannel((error, channel) => {
    if (error) throw error;

    const exchangeName = 'topic_exchange';
    const queueName = 'consumer2_queue';
    const routingKey = 'event.type.consumer1';

    channel.assertExchange(exchangeName, 'topic', { durable: false });
    channel.assertQueue(queueName, { durable: false });
    channel.bindQueue(queueName, exchangeName, routingKey);

    console.log('Consumer 2 is waiting for events...');

    channel.consume(
      queueName,
      (message) => {
        if (message !== null) {
          const content = message.content.toString();
          console.log('Consumer 2 received event:', content);

          // Process the event...

          channel.ack(message); // Acknowledge the event
        }
      },
      { noAck: false } // Enable manual acknowledgments
    );
  });
});
