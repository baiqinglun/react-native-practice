import Colors from '@/constants/Colors';
import { StyleSheet ,Text,View,Image} from 'react-native';
import {Film} from '@/types';

export const defaultFilmImage = 
  "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p616779645.webp"

// 重新整合进FilmItemProps
type FilmItemProps = {
  film : Film
}

const FilmListItem = ({film}:FilmItemProps) => {
  return (
    <>
      <View style={styles.container}>
      <Image style={styles.img} source={{uri:film.img || defaultFilmImage}} resizeMode='contain'/>
      <Text style={styles.title}>{film.name}</Text>
      <Text style={styles.time}>上映时间:{film.time}</Text>
    </View>
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
    color:Colors.light.tint,
    fontWeight:'bold'
  }
});
