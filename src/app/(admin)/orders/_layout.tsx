import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const OrdersLayout = () => {
  return (
    <Stack>
      {/* <Stack.Screen name='index' options={{title:'订单'}}></Stack.Screen> */}
      <Stack.Screen name='list' options={{headerShown:false}}></Stack.Screen>
    </Stack>
  )
}

export default OrdersLayout