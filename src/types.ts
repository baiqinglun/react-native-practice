export type Film = {
    id:number;
    name:string;
    img:string | null;
    description:string;
    time:number;
    price:number;
}

export type Rate = 'G' | 'Q' | 'B'

export type CartItem = {
    id:string;
    film:Film;
    film_id:number;
    rate:Rate;
    times:number;
}

export const OrderStatusList: OrderStatus[] = [
    'New',
    'Cooking',
    'Delivering',
    'Delivered',
  ];

export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

export type Order = {
    id: number;
    created_at: string;
    total: number;
    user_id: string;
    status: OrderStatus;
    order_items?: OrderItem[];
};

export type OrderItem = {
    id: number;
    film_id: number;
    films: Film;
    order_id: number;
    rate: Rate;
    times: number;
};