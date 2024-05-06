import { View, Text, StyleSheet, Image, TextInput} from 'react-native'
import React, { useState } from 'react'
import { defaultFilmImage } from '@/constants/Images'
import Colors from '@/constants/Colors'
import Button from '@/components/Button'
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router'

const CreateItem = () => {
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [error,setError] = useState('')
    const [image, setImage] = useState("");

    // 选择图片
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    // 清除区域内容
    const resetFields = () => {
        setName("")
        setPrice("")
    }

    // 创建
    const create = () => {
        if(!validateInput()){
            return;
        }
        resetFields()
    }

    // 权限验证
    const validateInput = () => {
        setError("")

        if(!name){
            setError("名称不能为空")
            return false;
        }

        if(!price){
            setError("价格不能为空")
            return false;
        }

        if((isNaN(parseFloat(price)))){
            setError("价格不是数字")
            return false;
        }

        return true;
    }

  return (
    <View style={styles.container}>
        <Stack.Screen options={{title:"创建",headerTitleAlign:'center'}}></Stack.Screen>
        <Image style={styles.img} source={{uri:image || defaultFilmImage}}/>
        <Text onPress={pickImage} style={styles.selectText}>选择图片</Text>

        <Text style={styles.text}>名称</Text>
        <TextInput placeholder='名称' value={name} style={styles.input} onChangeText={setName}></TextInput>

        <Text style={styles.text}>价格（￥）</Text>
        <TextInput placeholder={'35'}  value={price}  style={styles.input} onChangeText={setPrice}></TextInput>

        <Text style={styles.error}>{error}</Text>

      <Button text='创建' onPress={()=>{create()}}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    img:{
        width:'60%',
        aspectRatio:1,
        alignSelf:'center',
        resizeMode:'contain'
    },
    selectText:{
        textAlign:'center',
        fontSize:15,
        color:Colors.light.tint,
        margin:5
    },
    input:{
        backgroundColor:'white',
        width:'100%',
        height:40,
        padding:10,
        borderRadius:5,
        margin:5
    },
    text:{
        color:'grey',
        fontSize:15,
        margin:5
    },
    error:{
        color:'red'
    }
})

export default CreateItem