const json = require('stream/consumers');

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:password@localhost:5672', (error, connection) => {
  if (error) throw error;

  connection.createChannel((error, channel) => {
    if (error) throw error;

    const exchangeName = 'ship-registered';
    const routingKey = 'event.ship-registered';

    channel.assertExchange(exchangeName, 'topic', { durable: false });

     const jsonData = {
      "data": {
        "shipData": [
          { "id": 1, "name": "Ship 1", "hasBeenCleared": true },
        ],
        "refillServiceData": [
          {
            "id": 1,
            "ship_id": 1,
            "needsRefuelling": true,
            "needsRecharging": false,
          }
        ],
        "trafficPlanning": [
          {
          "dockName": "Erwin",
          "arrival": "02-25-1999",
          "departure": "02-19-1999"
        }
        ]
      }
    };

    const message = JSON.stringify(jsonData);
    
    channel.publish(exchangeName, routingKey, Buffer.from(message));

    console.log('Event published:', message);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  });
});