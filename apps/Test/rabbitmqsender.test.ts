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
    cmd: 'create-ship',
    data: shipData,
  };

  client.send(message, {}).subscribe(
    (response) => {
      console.log('Created ship:', response.ship);
      client.close();
    },
    (error) => {
      console.error('Error:', error);
      client.close();
    }
  );
}

testRabbitMQ();
