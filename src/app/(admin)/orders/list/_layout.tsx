import { View, Text,SafeAreaView, Platform } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext ,Stack} from 'expo-router';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const OrderListStack = () => {
  return (
    <>
    <SafeAreaView style={{flex:1,marginTop:Platform.OS === "ios" ? 0: 30}}>
        <Stack.Screen options={{title:`订单详情`,headerTitleAlign:"center"}}></Stack.Screen>
        <TopTabs/>
    </SafeAreaView></>
  )
}

export default OrderListStack