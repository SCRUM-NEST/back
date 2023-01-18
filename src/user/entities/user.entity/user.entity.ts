import { UserRoleEnum } from "src/enums/user.role.enum";
import { TimeStampEntities } from "src/Generics/Timestamp.entities";
import { Order } from "src/order/entities/order.entity";
import { Column,Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity extends TimeStampEntities {

@PrimaryGeneratedColumn()
id:number;

@Column( {
    unique:true
    
})
username : string;
@Column()
age:number;
@Column({
    unique:true
}
)
email: string ;
@Column() 
password : string;
@Column() 
salt:string;
@Column()
phoneNumber: number ; 

@Column({
    type: 'enum', 
    enum: UserRoleEnum ,
    default: UserRoleEnum.USER
    })
role: string ; 

@OneToMany(
    type=> Order,
    (order)=> order.users
)
orders: Order[];

}
