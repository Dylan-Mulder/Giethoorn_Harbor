const { ClientProxyFactory, Transport } = require('@nestjs/microservices');

async function testRabbitMQ() {
  const rabbitMQOptions = {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:password@localhost:5672'], // Update with your RabbitMQ connection details
      queue: 'Refilling-Queue', // Update with the queue name used by your ShipController
      queueOptions: { durable: true },
      managementApi: true, // Enable management API
    },
  };

  const client = await ClientProxyFactory.create(rabbitMQOptions);

  const shipData = {
    ship_id: 15, // Provide the desired ship ID
    ship_name: 'Ocean Voyager',
    ship_type: 'Cargo',
    ship_capacity: 5000,
    ship_status: 'Active',
  };

  const message = {
    pattern: 'refilling_queue', // Specify the pattern matching the message handler in your ShipController
    data: shipData,
  };

  client.emit(message.pattern, message.data).subscribe(
    (response) => {
      console.log('Event published successfully');
      client.close();
    },
    (error) => {
      console.error('Error:', error);
      client.close();
    }
  );
}

testRabbitMQ();
