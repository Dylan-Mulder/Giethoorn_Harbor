amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:password@localhost:5672', (error, connection) => {
  if (error) throw error;

  connection.createChannel((error, channel) => {
    if (error) throw error;

    const exchangeName = 'topic_exchange';
    const routingKey = 'event.type';

    channel.assertExchange(exchangeName, 'topic', { durable: false });

    const message = 'Your event data goes here.';
    channel.publish(exchangeName, routingKey, Buffer.from(message));

    console.log('Event published:', message);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  });
});