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

      const newOrder =this.orderRepository.create(order);
      await this.orderRepository.save(newOrder);
      return newOrder;
    }


    async viewOrderByTailors(id:number){ 
      const user= await this.userService.getUserById(id);
      if (user) {
      return  await this.orderRepository.createQueryBuilder("order")
      .select("order.id")
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
      .select("order.id")
      .where("order.usersId = :id")
      .setParameters({id})
      .groupBy("order.usersId")
      .getRawMany();
       }
      else throw new NotFoundException(`the user with id ${id} does not exist`);
    }


    async updateOrder( updateCriteria, order :  UpdateOrderDto){
      return await this.orderRepository.update(updateCriteria, order);
    }
   

    }

   

