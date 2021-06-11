import { OrderItem } from './order-item';
import { User } from '@ghost/users';

export class Order {
    id?: string;
    orderItem?: OrderItem;
    shippingAdsress1?: string;
    shippingAdsress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: number;
    totalPrice?: string;
    user?: User;
    dateOrdered?: string;
}
