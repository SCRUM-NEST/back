import { Controller, Post, Body , Get, Patch, ParseIntPipe } from '@nestjs/common';
import { AddOrderDto } from 'src/order/dto/add-order.dto';
import { UpdateOrderDto } from 'src/order/dto/update-order.dto';
import { OrderService } from './order.service';
import { Order } from 'src/order/entities/order.entity';
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

  
  @Get('ordersByuser/:id') 
  async viewOrderByUsers(@Param('id',ParseIntPipe)id:number){
     return await this.orderService.viewOrderByUsers(id);}
  

  @Get('ordersByTailors/:id') 
    async viewOrderByTailors(@Param('id',ParseIntPipe)id:number){
     return await this.orderService.viewOrderByTailors(id);
  }


  
  @Patch()
  async updateOrder(
    @Param() updateCriteria ,
    @Body() order : UpdateOrderDto){
    return await this.orderService.updateOrder(updateCriteria, order);
  }


 }

  
  




