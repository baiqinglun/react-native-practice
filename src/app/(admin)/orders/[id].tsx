import { View, Text, FlatList,StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import OrderListItem from '@/components/OrderListItem';
import orders from '@assets/data/orders';
import OrderItemListItem from '@/components/OrderItemListItem';
import { OrderStatusList } from '@/types';
import Colors from '@/constants/Colors';

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
          ListFooterComponent={()=>(
            <>
              <Text style={{fontWeight:'600',fontSize:20,color:Colors.light.tint,marginVertical:10}}>状态：</Text>
              <View style={{flexDirection:'row',gap:5}}>
                {OrderStatusList.map((status)=>(
                  <Pressable
                    key={status}
                    onPress={()=>{console.warn("更新成功")}}
                    style={{
                      borderColor:Colors.light.tint,
                      borderWidth:1,
                      padding:10,
                      borderRadius:5,
                      marginVertical:10,
                      backgroundColor:order?.status === status ? Colors.light.tint : 'transparent'
                    }}
                  >
                    <Text style={{color:order?.status === status ? "white":  Colors.light.tint}}>{status}</Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}
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