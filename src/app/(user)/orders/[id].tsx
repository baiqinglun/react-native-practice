import { View, Text, FlatList,StyleSheet } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import OrderListItem from '@/components/OrderListItem';
import orders from '@assets/data/orders';
import OrderItemListItem from '@/components/OrderItemListItem';

const OrderId = () => {
  const {id} = useLocalSearchParams();

  const order = orders.find((o)=>o.id.toString() === id)

  return (
    <View>
      <Stack.Screen options={{title:`订单【${id}】详情`,headerTitleAlign:"center"}}></Stack.Screen>
      <View style={styles.container}>
        <OrderListItem order={order}/>
        <FlatList data={order?.order_items}
          renderItem={({item})=><OrderItemListItem item={item}></OrderItemListItem>}
          contentContainerStyle={{gap:10,marginTop:20}}
        />
      </View>
    </View>
  )
}

const styles  = StyleSheet.create({
  container:{
    gap:10,
    padding:10
  }
})

export default OrderId