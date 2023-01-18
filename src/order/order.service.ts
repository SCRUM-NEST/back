import { Body, NotFoundException } from '@nestjs/common';
import { AddOrderDto } from 'src/order/dto/add-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOrderDto } from 'src/order/dto/update-order.dto';
import { Injectable } from '@nestjs/common';
import { Order } from 'src/order/entities/order.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OrderService {
   

    constructor(
      @InjectRepository(Order)
      private orderRepository : Repository<Order> ,
      private userService: UserService
    ){}
    
    
    async submitOrder(order: AddOrderDto): Promise<Order>{
      const tailor= await this.userService.getUserById(order.tailorId);
      const user= await this.userService.getUserById(order.userId);
        
      return await this.orderRepository.save({
        ...order,
        tailor:tailor,
        user:user
      });
    }


    async viewOrderByTailors(id:number){ 
      const user= await this.userService.getUserById(id);
      if (user) {
      return  await this.orderRepository.createQueryBuilder("order")
      .select("*")
      .where("order.tailorId = :id")
      .setParameters({id})
      .groupBy("order.tailorId")
      .getRawMany();
       }
      else throw new NotFoundException(`the tailor with id ${id} does not exist`);
    }



    async viewOrderByUsers(id:number){ 
      const user= await this.userService.getUserById(id);
      if (user) {
      return  await this.orderRepository.createQueryBuilder("order")
      .select("*")
      .where("order.userId = :id")
      .setParameters({id})
      .groupBy("order.userId")
      .getRawMany();
       }
      else throw new NotFoundException(`the user with id ${id} does not exist`);
    }


 

     async updateOrder(id: number, order: UpdateOrderDto): Promise<Order> {
        const newOrder = await this.orderRepository.preload({
            id,
            ...order
        });

        if (!newOrder)
            throw new NotFoundException(`The order with the id ${id} does not exist `);

        return await this.orderRepository.save(newOrder);
    }
   

    }

   

