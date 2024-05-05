import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const FilmDetailScreen = () => {
  const {id} = useLocalSearchParams();
  
  return (
    <View>
      <Stack.Screen options={{title:`详情${id}`}}></Stack.Screen>
      <Text>FilmDetailScreen{id}</Text>
    </View>
  )
}

export default FilmDetailScreen