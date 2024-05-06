import Colors from '@/constants/Colors';
import { StyleSheet ,Text,Image, Pressable} from 'react-native';
import {Film} from '@/types';
import { Link } from 'expo-router';
import { defaultFilmImage } from '../constants/Images';

// 重新整合进FilmItemProps
type FilmItemProps = {
  film : Film
}

const FilmListItem = ({film}:FilmItemProps) => {
  return (
    <>
    {/* asChild 属性的作用可能是告诉 Link 组件将其包裹的内容作为子组件处理，而不是作为链接的文本内容。 */}
    <Link href={`/film/${film.id}`} asChild> 
        <Pressable style={styles.container}>
        <Image style={styles.img} source={{uri:film.img || defaultFilmImage}} resizeMode='contain'/>
        <Text style={styles.title}>{film.name}</Text>
        <Text style={styles.time}>上映时间:{film.time}</Text>
        <Text style={styles.price}>价格:￥{film.price}</Text>
        </Pressable>
      </Link>
    </>
  )
}

export default FilmListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#fff",
    padding:10,
    borderRadius:20,
    flex:1,
    maxWidth:'50%'
  },
  img:{
    width:'100%',
    // 长宽比1，表示保持长宽比
    aspectRatio:1
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    marginVertical:10
  },
  time:{
    color:Colors.light.text,
    fontWeight:'bold'
  },
  price:{
    color:Colors.light.tint,
    fontWeight:'bold'
  }
});
