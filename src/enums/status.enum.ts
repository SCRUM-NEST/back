import { CANCELLED } from "dns";

export enum Status {
    DEFAULT = 'pending' ,
    ACCEPTED = 'accepted' ,
    DECLINED = 'declined',
    DELIVERED= 'delivered' ,
    CANCELLED= 'cancelled'
}