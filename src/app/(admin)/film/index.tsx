import { FlatList, View, Pressable} from 'react-native';
import FilmListItem from '@/components/FilmListItem';
import films from '@assets/data/films';
import { Link, Stack} from 'expo-router';
import Colors from '@/constants/Colors';
import {Ionicons} from '@expo/vector-icons';

export default function FilmListScreen() {
  return (
    <>
    <Stack.Screen
      options={{
        title:"电影栏",
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
          </Link>)
      }}/>
      {
        <FlatList data={films}
        renderItem={({item})=><FilmListItem film={item}></FilmListItem>}
        numColumns={2}
        contentContainerStyle={{gap:10,padding:10}} // contentContainerStyle属性用于指定FlatList的内容容器的样式，它可以接受一个样式对象，用于自定义列表内容的布局和样式。
        columnWrapperStyle={{gap:10}} // columnWrapperStyle属性用于定义在多列布局中每一列的样式。
        ></FlatList>
      }
    </>
  );
}
