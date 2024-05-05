import { Stack } from 'expo-router'

const FilmStack = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{title:"电影栏"}}></Stack.Screen>
    </Stack>
  )
}

export default FilmStack