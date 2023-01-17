import { OneToMany, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from 'src/enum/status.enum';

@Entity('order')
export class Order {

    @PrimaryGeneratedColumn()
    orderId: number;   

    @Column()
    description: string 

    @Column()
    budget: string  

    @Column()
    image: string //temporarly because it will be an image api

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
  }