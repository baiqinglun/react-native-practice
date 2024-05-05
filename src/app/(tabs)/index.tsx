import Colors from '@/constants/Colors';
import { StyleSheet ,Text,View,Image} from 'react-native';
import products from '../../../assets/data/products';

const product = products[1]

export default function TabOneScreen() {
  return (
    <>
    <View style={styles.container}>
      <Image style={styles.img} source={{uri:product.img}}/>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.time}>上映时间:{product.time}</Text>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#fff",
    padding:10,
    borderRadius:20
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
