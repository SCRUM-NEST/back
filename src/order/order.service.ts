import { Body } from '@nestjs/common';
import { AddOrderDto } from 'src/order/dto/add-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOrderDto } from 'src/order/dto/update-order.dto';
import { Injectable } from '@nestjs/common';
import { Order } from 'src/order/entities/order.entity';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class OrderService {

    constructor(
      @InjectRepository(Order)
      private orderRepository : Repository<Order> ,
    ){}
    
    
    async submitOrder(order: AddOrderDto): Promise<Order>{

      const newOrder =this.orderRepository.create(order);
      await this.orderRepository.save(newOrder);
      return newOrder;
    }


    async viewOrder():Promise<Order[]>{ // (user)
      return await this.orderRepository.find() ; // ({user})

    }

    async updateOrder( updateCriteria, order :  UpdateOrderDto){
      return await this.orderRepository.update(updateCriteria, order);
    }
   

    }

   

