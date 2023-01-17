import { CANCELLED } from "dns";

export enum Status {
    DEFAULT = 'Pending' ,
    ACCEPTED = 'In process' ,
    DECLINED = 'DECLINED',
    DELIVERED= 'Delivered' ,
    CANCELLED= 'Cancelled'
}