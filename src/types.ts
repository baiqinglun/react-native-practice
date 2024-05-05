export type Film = {
    id:number;
    name:string;
    img:string | null;
    description:string;
    time:number;
}

export type Rate = 'G' | 'Q' | 'B'