import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LeaseAgreementService } from './cqrs-dock-rental.service';
import { CreateLeaseAgreementDTO } from './entities/dto/create-lease-agreement.dto';


@Controller('lease-agreements')
export class CQRSLeaseAgreementController {

  constructor(private readonly service: LeaseAgreementService) { }

  @Get('all')
  async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  async getDrinksById(@Param('id') id: number) {
    return this.service.getDrinksById(id);
  }

  @Post('add')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createDrinks(@Body() payload: CreateLeaseAgreementDTO) {
    return this.service.create(payload);
  }

  @Patch(':id/update')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateDrinks(
    @Param('id') id: number,
    @Body('reference') reference: string,
    @Body('dock_id') dockId: number,
    @Body('ship_company_id') shipCompId: number,
    @Body('sign_date') sign: Date,
    @Body('valid_until') valid: Date,
    @Body('price') price: number
  ) {
    return await this.service.update(id, reference, dockId, shipCompId, new Date(sign), new Date(valid), price);
  }

  @Delete(':id/delete')
  @HttpCode(200)
  deleteDrinks(
    @Param('id') id: number) {
    return this.service.delete(id);
  }
}