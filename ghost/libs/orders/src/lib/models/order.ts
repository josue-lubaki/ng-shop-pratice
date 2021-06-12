/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderItem } from './order-item';
import { User } from '@ghost/users';

export class Order {
    id!: string;
    orderItems?: any;
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: number;
    totalPrice?: string;
    user?: User;
    dateOrdered?: string;
}