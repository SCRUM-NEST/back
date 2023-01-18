import { UserRoleEnum } from "src/enums/user.role.enum";
import { TimeStampEntities } from "src/Generics/Timestamp.entities";
import { Order } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity extends TimeStampEntities {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({})
    firstName: string;

    @Column({})
    lastName: string;

    @Column({unique: true})
    username: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;
    @Column()
    salt: string;



    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
    })
    role: string;

    @OneToMany(
        type => Order,
        (order) => order.user
    )
    orders: Order[];

    @OneToMany(
        type => Order,
        (order) => order.tailor
    )
    retailer_orders: Order[];

}
