import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthStack = () => {
  return (
    // 单独配置页面右上角图标
    <Stack>
        <Stack.Screen name='index'/>
        <Stack.Screen name='sign-up'/>
        <Stack.Screen name='sign-in'/>
    </Stack>
  )
}

export default AuthStack