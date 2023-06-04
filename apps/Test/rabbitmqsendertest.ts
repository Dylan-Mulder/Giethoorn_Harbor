json = require('stream/consumers');
amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:password@localhost:5672', (error, connection) => {
  if (error) throw error;

  connection.createChannel((error, channel) => {
    if (error) throw error;

    // const exchangeName = 'dock-created';
    // const routingKey = 'event.dock-created';
    // const exchangeName = 'lease-agreement-created';
    // const routingKey = 'event.lease-agreement-created';
    // const exchangeName = 'shipping-company-created';
    // const routingKey = 'event.shipping-company-created';

    // const exchangeName= 'ship-has-docked';
    // const routingKey = 'event.ship-has-docked';
    const exchangeName= 'ship-registered';
    const routingKey = 'event.ship-registered';
    channel.assertExchange(exchangeName, 'topic', { durable: false });

     const jsonData = {
      "data": {
        "ship": 
          { 
            "name": "Demo Maersk",
            "shipping_company_name": "Avans",
            "max_load_in_tonnage": 2500,
            "length_in_m": 500,
            "is_cleared": false,
            "is_denied": false, 
            "id": 4,
            "stream_id": "2f41b667-ac9a-4808-ae41-ebc64d9ae65f",
            "created_at": "2023-05-31T21:13:27.911Z"
          },
        
        "refillService": 
          {
            "id": 1,
            "traffic_planning_id": 1,
            "ship": { "id": 1, "name": "Ship 1" },
            "ship_id": 1,
            "needsRefuelling": true,
            "needsRecharging": false
          }
        ,
        "trafficPlanning":
          {
            "id":1,
            "dockName":"dock 2",
            "arrival": "2023-05-31T12:00:00Z",
            "departure": "2023-05-31T20:00:00Z"
          }
        
      }
    };

    // const jsonData = {
    //   "data": {
    //     "dock": [
    //       { 
    //         "id": 1, 
    //         "name": "Dock Erwin 1", 
    //         "created_at": "02-25-1999" },
    //     ],
    //     "leaseAgreement": [
    //       {
    //         "id": 1,
    //         "dock_id": 1,
    //         "shipping_company_id": 1,
    //         "price": 1000,
    //         "reference": "Erwintje",
    //         "sign_date":"02-25-1999",
    //         "valid_until":"02-25-1999"
    //       }
    //     ],
    //     "shippingCompany":[
    //       {
    //         "country":"India 2",
    //         "name":"Niek Roos B.V. 2.0",
    //         "reference":"Niek 2"
    //       }
    //     ]
    //   }
    // };


    const message = JSON.stringify(jsonData);
    
    channel.publish(exchangeName, routingKey, Buffer.from(message));

    console.log('Event published:',exchangeName,routingKey, message);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  });
});