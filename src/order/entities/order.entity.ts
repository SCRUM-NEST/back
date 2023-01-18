 import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Status } from 'src/enums/status.enum';
import { UserEntity } from 'src/user/entities/user.entity/user.entity';
import { TimeStampEntities } from 'src/Generics/Timestamp.entities';

@Entity()
export class Order extends TimeStampEntities{

    @PrimaryGeneratedColumn()
    orderId: number;   

    @Column()
    description: string 

    @Column()
    budget: string  


    @Column()
    cost: string  

    @Column()
    meeting_date: string

    @Column()
    meeting_link: string

    @Column(
      {type: 'enum',
      enum: Status ,
      default: Status.DEFAULT}
    )
    status: string
    
   @ManyToOne(
      type => UserEntity,
      (user) =>user.orders
    
    )
    users:UserEntity; 

    @ManyToOne(
      type => UserEntity,
      (user) =>user.orders
    
    )
    tailor:UserEntity; 
  } 