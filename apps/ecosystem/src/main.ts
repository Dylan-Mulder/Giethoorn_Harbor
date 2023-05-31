import { EcosystemModule } from './ecosystem.module';
import { EcosystemService } from './ecosystem.service';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions, RmqContext } from '@nestjs/microservices';
import { EcosystemController } from './ecosystem.controller';
import * as amqp from 'amqplib';
import { WaterQualityReport } from './entities/water-quality-report.entity';
import { MarineLifeReportList } from './entities/marine-life-report.entity';

async function bootstrap() {
  const app = await NestFactory.create(EcosystemModule);

  const configService = app.get(ConfigService);

  const USER = configService.get('RABBITMQ_USER');
  const PASSWORD = configService.get('RABBITMQ_PASS');
  const HOST = configService.get('RABBITMQ_HOST');
  const QUEUE = configService.get('RABBITMQ_ECOSYSTEM_QUEUE');
  const ecosystemController = app.get(EcosystemController)
  const eosystemService = app.get(EcosystemService)

  const consumerConfigs = [
    {
      exchange: 'waterquality-inspected',
      routingKeyPattern: 'event.waterquality-inspected',
      methodToCall:ecosystemController.handleWaterQualityInspected
    },
    {
      exchange: 'marinelife-inspected',
      routingKeyPattern: 'event.marinelife-inspected',
      methodToCall:ecosystemController.handleMarineLifeHasBeenInspected
    }
  ];

  
  for (const consumerConfig of consumerConfigs) {
    const { exchange, routingKeyPattern, methodToCall} = consumerConfig;
    const connection = await amqp.connect(`amqp://${USER}:${PASSWORD}@${HOST}`);
    
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'topic', { durable: false });
    await channel.assertQueue("ec-c-"+exchange, { durable: true });
    await channel.bindQueue("ec-c-"+exchange, exchange, routingKeyPattern);


    console.log("Consumer listening on: "+exchange);
    
    
    await channel.consume(
      "ec-c-"+exchange,
          async (message) => {
            if (message !== null) {
              const content = message.content.toString();
              console.log('Consumer ' + exchange +' received event');
              // Process the event:
              const rmqContext = new RmqContext([message, channel, null]);
              await methodToCall.call(ecosystemController, content, rmqContext);
            }
          },
    );

    let report;
    if(exchange.toString() == 'waterquality-inspected'){
      report = await eosystemService.getWaterQualityReport(); 
      await addWaterQualityReportToExchange(exchange, routingKeyPattern, report, channel);
    }
    else{
      report = await eosystemService.getMarineLifeReport();
      await addMarineQualityReportToExchange(exchange, routingKeyPattern, report, channel);
    }

}

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
      noAck:false,
      queue: QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });
 
  app.startAllMicroservices();
}
bootstrap();

async function addWaterQualityReportToExchange(
  exchangeName: string,
  routingKey: string,
  report: WaterQualityReport,
  channel: amqp.Channel
) {
  const reportData = JSON.stringify(report);
  await channel.publish(exchangeName, routingKey, Buffer.from(reportData));
}

async function addMarineQualityReportToExchange(
  exchangeName: string,
  routingKey: string,
  report: MarineLifeReportList,
  channel: amqp.Channel
) {
  const reportData = JSON.stringify(report);
  await channel.publish(exchangeName, routingKey, Buffer.from(reportData));
}