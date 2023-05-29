import { NestFactory } from '@nestjs/core';
import { TrafficControlModule } from './traffic_control.module';
import { TrafficControlService } from './traffic_control.service'; // Import the TrafficControlService

async function bootstrap() {
  const app = await NestFactory.create(TrafficControlModule);

  // Create new ship from TrafficControlService
  const trafficControlService = app.get(TrafficControlService); // Use the imported TrafficControlService

  async function createNewShip(shipData: any) {
      const newShip = await trafficControlService.createShip(shipData);
  }

  const exampleShipData = {
    name: 'My Ship',
  };

  await createNewShip(exampleShipData);
}

bootstrap();