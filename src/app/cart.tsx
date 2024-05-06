import { View, Text, Platform, FlatList,StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useCart } from '@/providers/CartProveider'
import CartListItem from '@/components/CartListItem'
import Colors from '@/constants/Colors'

const CartScreen = () => {
  const {items} = useCart()
  
  return (
    <View>
      {items ?
        <FlatList
        data={items}
        renderItem={({item})=>{return(<CartListItem cartItem={item}></CartListItem>)}}
        contentContainerStyle={{padding:10,gap:10}}/>
        : <View style={styles.container}><Text style={styles.defaultText}>没有选择影片</Text></View>}

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}></StatusBar>
    </View>
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
  }
})

export default CartScreen