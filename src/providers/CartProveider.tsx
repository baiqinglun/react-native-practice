import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem ,Film} from '@/types'

type CartType = {
    items:CartItem[],
    addItem:(film:Film,rate:CartItem['rate']) => void
  }

const CartContext = createContext<CartType>({
    items:[],
    addItem:()=>{}
})

const CartProvider = ({children}:PropsWithChildren) => {
    const [items,setItems] = useState<CartItem[]>([])
    const addItem = (film:Film,rate:CartItem['rate']) => {
        const newCartItem:CartItem = {
            id:"1",
            film,
            film_id:film.id,
            rate,
            times:1
        }
        setItems([newCartItem,...items])
        console.log(items)
    }

    return (
        <CartContext.Provider value={{items,addItem}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

export const useCart = () => useContext(CartContext)