import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const TabIndex = () => {
  return (
    <Redirect href={'/(user)/orders'}></Redirect>
  )
}

export default TabIndex