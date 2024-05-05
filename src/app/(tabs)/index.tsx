import { FlatList, View} from 'react-native';
import FilmListItem from '@/components/FilmListItem';
import films from '@assets/data/films';

export default function FilmListScreen() {
  return (
    <>
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
