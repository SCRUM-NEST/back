import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class TimeStampEntities 
{ 
    @CreateDateColumn({
        update:false 
    })
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date ; 

    @UpdateDateColumn()
    updatedAt: Date ; 


}