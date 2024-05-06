import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, Stack} from 'expo-router';
import { Pressable } from 'react-native';

const FilmStack = () => {
  return (
    <Stack screenOptions={{
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <AntDesign
                  name="clockcircle"
                  size={25}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}>
        <Stack.Screen
          name='index'
          options={{title:"电影栏"}}></Stack.Screen>
    </Stack>
  )
}

export default FilmStack