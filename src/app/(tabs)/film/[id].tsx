import { View, Text ,Image,StyleSheet, Pressable, Button} from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import films from '@assets/data/films';
import Colors from '@/constants/Colors';
import { useCart } from '@/providers/CartProveider';
import { Rate } from '@/types';

const FilmDetailScreen = () => {
  const {id} = useLocalSearchParams();
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
  }

  return (
    <>
      <View style={styles.container}>
      <Stack.Screen options={{title:`${film?.name}`}}></Stack.Screen>

      <Image style={styles.img} source={{uri:film?.img}}></Image>
      <Text style={styles.description}>{film?.description}</Text>
      
      <Text>Select Rate</Text>
      <View style={styles.rates}>
          {rates.map(rate=>
            (
              <Pressable
                onPress={()=>{setSelectedRate(rate)}}
                key={rate}
                style={[styles.rate,{backgroundColor:selectedRate === rate ? Colors.light.tint : 'white'}]}>
                  <Text style={[styles.rateText,{color:selectedRate == rate ? 'white' : 'grey'}]}>{rate}</Text>
              </Pressable>
            )
          )}
      </View>

      <Pressable
         onPress={()=>{moveToView()}} style={styles.moveToView}>
        <Text style={styles.moveToViewBtn}>去观看</Text>
      </Pressable>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    flex:1,
    padding:10
  },
  description:{
    textAlign:'center',
    margin:10,
    fontSize:20
  },
  img:{
    width:'100%',
    aspectRatio:1
  },
  rates:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginVertical:10
  },
  rate:{
    backgroundColor:'gainsboro',
    width:50,
    aspectRatio:1,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center'
  },
  rateText:{
    fontSize:20,
    fontWeight:'600'
  },
  moveToView:{
    backgroundColor:Colors.light.tint,
    width:'100%',
    paddingVertical:15,
    marginVertical:10,
    borderRadius:50,
    marginTop:'auto'
  },
  moveToViewBtn:{
    textAlign:'center',
    color:'white',
    fontSize:15,
    fontWeight:'bold'
  }
})

export default FilmDetailScreen