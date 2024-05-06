import { View, Text } from 'react-native'
import React from 'react'
import { withLayoutContext ,Stack} from 'expo-router';

const achive = () => {
  return (
    <>
        <Stack.Screen options={{title:`完成`,headerTitleAlign:"center"}}></Stack.Screen>
        <Text>achive</Text>
    </>
  )
}

export default achive