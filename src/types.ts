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