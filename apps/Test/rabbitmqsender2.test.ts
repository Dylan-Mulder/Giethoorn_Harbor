const json = require('stream/consumers');

amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:password@localhost:5672', (error, connection) => {
  if (error) throw error;

  connection.createChannel((error, channel) => {
    if (error) throw error;

    const exchangeName = 'ship-has-docked';
    const routingKey = 'event.ship-has-docked';

    channel.assertExchange(exchangeName, 'topic', { durable: false });

     const jsonData = {
      "data": {
        "shipData": [
          { "id": 1, "name": "Ship 1" },
        ],
        "refillServiceData": [
          {
            "id": 1,
            "trafficPlanning": {},
            "ship": { "id": 1, "name": "Ship 1" },
            "needsRefuelling": true,
            "needsRecharging": false
          }
        ],
        "trafficPlanningData":[
          {
            "id":1,
            "dockName":"dock 2",
            "arrival": "2023-05-31T12:00:00Z",
            "departure": "2023-05-31T20:00:00Z"
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