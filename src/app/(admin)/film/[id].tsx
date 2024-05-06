import { View, Text ,Image,StyleSheet, Pressable} from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter,Link } from 'expo-router'
import films from '@assets/data/films';
import Colors from '@/constants/Colors';
import { useCart } from '@/providers/CartProveider';
import { Rate } from '@/types';
import { FontAwesome } from '@expo/vector-icons';

const FilmDetailScreen = () => {
  const {id} = useLocalSearchParams();
  const router = useRouter()
  const {addItem} = useCart()
 
  const film = films.find((f)=>f.id.toString() === id);
  
  if(!film){
    return (<Text>Film not found!</Text>)
  }
  
  const rates:Rate[] = ['G' , 'Q' , 'B']
  const [selectedRate,setSelectedRate] = useState<Rate>('G')

  const moveToView = () => {
    if(!film){
      return;
    }

    addItem(film,selectedRate)
    router.push('/cart')
  }

  return (
    <View style={styles.container}>
      <Stack.Screen  options={{
            title: `${film?.name}`,
            headerRight: () => (
              <Link href={`/(admin)/film/create?id=${id}`} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}/>
      
      <Image style={styles.img} source={{uri:film?.img}}></Image>
      <Text style={styles.name}>{film?.name}</Text>
      <Text style={styles.description}>{film?.description}</Text>
      
      <Text style={styles.price}>价格：￥{film?.price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    flex:1,
    padding:10
  },
  description:{
    // textAlign:'center',
    margin:10,
    fontSize:15
  },
  img:{
    width:'100%',
    aspectRatio:1
  },
  name:{
    // textAlign:'center',
    margin:10,
    fontSize:20,
    fontWeight:'600',
    color:Colors.light.tint
  },
  price:{
    fontSize:20,
    fontWeight:'600',
    color:Colors.light.tint,
    margin:10,
  }
})

export default FilmDetailScreen