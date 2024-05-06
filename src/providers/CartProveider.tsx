import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem ,Film} from '@/types'
import * as Crypto from 'expo-crypto';

type CartType = {
    items:CartItem[],
    addItem:(film:Film,rate:CartItem['rate']) => void,
    updateTimes:(itemId:string,amount:-1 | 1) => void,
  }

const CartContext = createContext<CartType>({
    items:[],
    addItem:()=>{},
    updateTimes:()=>{}
})

const CartProvider = ({children}:PropsWithChildren) => {
    const [items,setItems] = useState<CartItem[]>([])
    
    // 新增观看影片
    const addItem = (film:Film,rate:CartItem['rate']) => {
        const existCartItem = items.find((item)=>item.film === film && item.rate === rate)

        if(existCartItem){
            updateTimes(existCartItem.id,1)
            return;
        }

        const newCartItem:CartItem = {
            id:Crypto.randomUUID(),
            film,
            film_id:film.id,
            rate,
            times:1
        }
        setItems([newCartItem,...items])
        // console.log(items)
    }

    // 更新数量
    const updateTimes = (itemId:string,amount:-1 | 1) => {
        // console.log(itemId,amount)
        const updatedItems = items.map((item)=>{
            return item.id !== itemId ? item : {...item,times:item.times+amount}
        }).filter((item)=>item.times>0)
        setItems(updatedItems)
    }

    return (
        <CartContext.Provider value={{items,addItem,updateTimes}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

export const useCart = () => useContext(CartContext)