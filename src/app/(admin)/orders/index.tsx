import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import orders from '@assets/data/orders'
import OrderListItem from '@/components/OrderListItem'

const IndexScreen = () => {

  return (
    <View>
      <Stack.Screen
        options={{
          title: '排序',
          headerTitleAlign:'center',
        }}
      />
      <FlatList
        data={orders}
        renderItem={({item}) => <OrderListItem order={item}/>}
        contentContainerStyle={{gap:10,padding:10}}
        />
    </View>
  )
}

export default IndexScreen