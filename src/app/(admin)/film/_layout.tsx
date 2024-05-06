import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Stack, useLocalSearchParams} from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';

const FilmStack = () => {
  const {id} = useLocalSearchParams();

  return (
    // 单独配置页面右上角图标
    <Stack>
        {/*电影栏页面  */}
        <Stack.Screen name='index'/>
        {/* 每个电影的内容页面 */}
        <Stack.Screen name='[id]'/>
    </Stack>
  )
}

export default FilmStack