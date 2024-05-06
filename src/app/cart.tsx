import { View, Text, Platform, FlatList,StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useCart } from '@/providers/CartProveider'
import CartListItem from '@/components/CartListItem'
import Colors from '@/constants/Colors'
import Button from '@/components/Button'

const CartScreen = () => {
  const {items,totalPrice} = useCart()
  const checkOut = () => {
    console.log("sda");
    
  }
  
  return (
    <>
      {items ?
        <FlatList
        data={items}
        renderItem={({item})=>{return(<CartListItem cartItem={item}></CartListItem>)}}
        contentContainerStyle={{padding:10,gap:10}}/>
        : <View style={styles.container}><Text style={styles.defaultText}>没有选择影片</Text></View>}

        <Text style={styles.totalPrice}>总价：￥{totalPrice}</Text>
        <Button onPress={checkOut} text='提交'></Button>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}></StatusBar>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
  },
  defaultText:{
    color:Colors.light.tint,
    fontSize:20,
    fontWeight:'bold',
  },
  totalPrice:{
    color:Colors.light.tint,
    fontSize:20,
    fontWeight:'bold',
    paddingLeft:20
  }
})

export default CartScreen