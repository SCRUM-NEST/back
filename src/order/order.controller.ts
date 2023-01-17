import { Controller, Post, Body , Get , Query, Put ,Delete, Patch } from '@nestjs/common';
import { AddOrderDto } from 'src/dto/add-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';
import { OrderService } from './order.service';
import { Order } from 'src/entities/order.entity';
import { Param } from '@nestjs/common/decorators';



@Controller('order')
export class OrderController {

  constructor(
    private orderService: OrderService
  ) {}


  @Post()
  async submitOrder(@Body() addOrderDto : AddOrderDto) : Promise<Order>{
   return await this.orderService.submitOrder(addOrderDto);
  }

  // liste des commandes
  @Get() 
  async viewOrder()// ( @User() user )
   : Promise<Order[]>{
     return await this.orderService.viewOrder(); //(user)
  }


  
  @Patch()
  async updateOrder(
    @Param() updateCriteria ,
    @Body() order : UpdateOrderDto){
    return await this.orderService.updateOrder(updateCriteria, order);
  }


 }

  
  




