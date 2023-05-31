import { Controller, Get } from '@nestjs/common';
import { DockRentalService } from './dock_rental.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class DockRentalController {
  constructor(private readonly dockRentalService: DockRentalService) {}
  
  @MessagePattern({ exchange: 'dock-created', routingKey: 'event.dock-created' })
  async handleDockCreated(
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const dockData = jsonData.data.dock;

      await this.dockRentalService.createDock(dockData);
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

  //DE-D-01	LeaseAgreementHasBeenCreated	A new Lease agreement has been created.
  @MessagePattern({ exchange: 'lease-agreement-created', routingKey: 'event.lease-agreement-created' })
  async handleLeaseAgreementCreated(
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const dockData = jsonData.data.dock;
      const leaseAgreementData = jsonData.data.leaseAgreement;
      const shippingCompanyData = jsonData.data.shippingCompany; 

      await this.dockRentalService.createLeaseAgreement(dockData,leaseAgreementData,shippingCompanyData);
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

}
