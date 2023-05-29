const amqp = require('amqplib');
const { Client } = require('pg');

// PostgreSQL settings
const postgresConfig = {
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'postgres',
};

async function connect() {
  const connection = await amqp.connect('amqp://user:password@localhost:5672'); // Replace with your RabbitMQ connection details
  const channel = await connection.createChannel();
  const queueName = 'refilling-service'; // Replace with the queue name used by your ShipConsumer

  // Assert the queue
  await channel.assertQueue(queueName, { durable: true });

  // Create a new ship in the database
  async function createShip(shipData) {
    const client = new Client(postgresConfig);
    await client.connect();

    try {
      const query = 'INSERT INTO ship (ship_id, ship_name, ship_type, ship_capacity, ship_status) VALUES ($1, $2, $3, $4, $5)';
      const values = [shipData.ship_id, shipData.ship_name, shipData.ship_type, shipData.ship_capacity, shipData.ship_status];
      await client.query(query, values);
      console.log('New ship created:', shipData);
    } catch (error) {
      console.error('Error creating ship:', error);
    } finally {
      await client.end();
    }
  }

  // Consume messages from the queue
  channel.consume(queueName, async (message) => {
    if (message) {
      const data = JSON.parse(message.content.toString());

      if (data.pattern && data.pattern.cmd === 'create-ship' && data.pattern.data) {
        const shipData = data.pattern.data;
        // Call your ship creation logic here with shipData
        console.log('Received ship data:', shipData);

        // Acknowledge the message
        channel.ack(message);

        // Create a new ship
        await createShip(shipData);
      }
    }
  });
}

connect().catch((error) => {
  console.error('Error:', error);
});
