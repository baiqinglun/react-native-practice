import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Stack} from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';

const FilmStack = () => {
  return (
    // 单独配置页面右上角图标
    <Stack>
        {/*电影栏页面  */}
        <Stack.Screen
          name='index'
          options={{
            headerRight: () => (
              <Link href="/(admin)/film/create" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="add-circle-outline"
                      size={25}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      color={Colors.light.tint}
                    />
                  )}
                </Pressable>
              </Link>),
            title:"电影栏"
          }}></Stack.Screen>

        {/* 每个电影的内容页面 */}
        <Stack.Screen
          name='[id]'
          options={{
            headerRight: () => (
              <Link href="/cart" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="pencil"
                      size={25}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      color={Colors.light.tint}
                    />
                  )}
                </Pressable>
              </Link>
            )}}></Stack.Screen>
    </Stack>
  )
}

export default FilmStack