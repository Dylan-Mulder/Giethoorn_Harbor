const json = require('stream/consumers');

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:password@localhost:5672', (error, connection) => {
  if (error) throw error;

  connection.createChannel((error, channel) => {
    if (error) throw error;

    // const exchangeName = 'dock-created';
    // const routingKey = 'event.dock-created';
    const exchangeName = 'lease-agreement-created';
    const routingKey = 'event.lease-agreement-created';
    // const exchangeName = 'shipping-company-created';
    // const routingKey = 'event.shipping-company-created';

    channel.assertExchange(exchangeName, 'topic', { durable: false });

    //  const jsonData = {
    //   "data": {
    //     "ship": [
    //       { "id": 1, "name": "Ship 1", "hasBeenCleared": true },
    //     ],
    //     "refillServiceData": [
    //       {
    //         "id": 1,
    //         "trafficPlanning": {},
    //         "ship": { "id": 1, "name": "Ship 1" },
    //         "needsRefuelling": true,
    //         "needsRecharging": false
    //       }
    //     ],
    //     "trafficPlanningData":[
    //       {
    //         "id":1,
    //         "dockName":"dock 2",
    //         "arrival": "2023-05-31T12:00:00Z",
    //         "departure": "2023-05-31T20:00:00Z"
    //       }
    //     ]
    //   }
    // };

    const jsonData = {
      "data": {
        "dock": [
          { 
            "id": 1, 
            "name": "Dock Erwin 1", 
            "created_at": "02-25-1999" },
        ],
        "leaseAgreement": [
          {
            "id": 1,
            "dock_id": 1,
            "shipping_company_id": 1,
            "price": 1000,
            "reference": "Erwintje",
            "sign_date":"02-25-1999",
            "valid_until":"02-25-1999"
          }
        ],
        "shippingCompany":[
          {
            "country":"India 2",
            "name":"Niek Roos B.V. 2.0",
            "reference":"Niek 2"
          }
        ]
      }
    };


    const message = JSON.stringify(jsonData);
    
    channel.publish(exchangeName, routingKey, Buffer.from(message));

    console.log('Event published:',exchangeName,routingKey, message);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  });
});