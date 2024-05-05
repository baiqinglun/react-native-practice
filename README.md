# 配置

手机软件：expo【用于调试expo程序】，需和电脑连接同一wifi

电脑投屏软件：[scrcpy](https://github.com/Genymobile/scrcpy)

# 软件开发

视频：[youtube教程](https://www.youtube.com/watch?v=rIYzLhkG9TA&t=5177s)

## 1、更改文件结构

创建`src`目录，将`app`、`components`和`constants`统一放入`src`目录下方便管理。

此时需要重新更改全局`@/`和字体路径

```json
// ./tsconfig.json
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": [
        // "./*"
        "./src/*"
      ]
    }
  }


```

字体

```tsx
// ./src/app/_layout.tsx
  const [loaded, error] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
```

## 2、列表渲染

列表组件

```tsx
export const defaultFilmImage =  "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p616779645.webp"

// 重新整合进FilmItemProps
type FilmItemProps = {
  film : Film
}

const FilmListItem = ({film}:FilmItemProps) => {
  return (
    <>
      <View style={styles.container}>
      <Image style={styles.img} source={{uri:film.img || defaultFilmImage}}/>
      <Text style={styles.title}>{film.name}</Text>
      <Text style={styles.time}>上映时间:{film.time}</Text>
    </View>
    </>
  )
}

export default FilmListItem
```

列表渲染

```tsx
import { FlatList, View} from 'react-native';
import FilmListItem from '@/components/FilmListItem';
import films from '@assets/data/films';

export default function FilmListScreen() {
  return (
    <>
    <View>
      {
        <FlatList data={films} renderItem={({item})=><FilmListItem film={item}></FilmListItem>}></FlatList>
      }
    </View>
    </>
  );
}

```

## 3、双列展示的问题

```tsx
export default function FilmListScreen() {
  return (
    <>
    <View>
      {
        <FlatList data={films}
        renderItem={({item})=><FilmListItem film={item}></FilmListItem>}
        numColumns={2}
        ></FlatList>
      }
    </View>
    </>
  );
}
```

`FlatList`使用`numColumns={2}`展示两列会出现问题

![image-20240506003536414](https://test-123456-md-images.oss-cn-beijing.aliyuncs.com/img/image-20240506003536414.png)

需要将子组件设置为`flex`属性

```tsx
const FilmListItem = ({film}:FilmItemProps) => {
  return (
    <>
      <View style={styles.container}>
      <Image style={styles.img} source={{uri:film.img || defaultFilmImage}}/>
      <Text style={styles.title}>{film.name}</Text>
      <Text style={styles.time}>上映时间:{film.time}</Text>
    </View>
    </>
  )
}

container: {
    backgroundColor:"#fff",
    padding:10,
    borderRadius:20,
    + flex:1
  },
```

>  如果数据为奇数个，最后一个则会占据整个屏幕宽度，解决办法是新增属性`maxWidth:'50%'`

## 4、更改代码结构并使用stack

新建`[id].tsx`页面，使用`const {id} = useLocalSearchParams();`获取属性



在`(Tabs)`下面有

![image-20240506012220410](https://test-123456-md-images.oss-cn-beijing.aliyuncs.com/img/image-20240506012220410.png)

`(tabs)/one.tsx`直接跳转至`film`

```tsx
import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const TabIndex = () => {
  return (
    <Redirect href={'/film/'}></Redirect>
  )
}

export default TabIndex
```

在配置时不显示

```tsx
<Tabs.Screen name='one' options={{href:null}}></Tabs.Screen>
```

组件的跳转页面路径也需要更改

![image-20240506012628293](https://test-123456-md-images.oss-cn-beijing.aliyuncs.com/img/image-20240506012628293.png)

详情页想要展示`stack`头，需要加一行代码

```tsx
import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const FilmDetailScreen = () => {
  const {id} = useLocalSearchParams();
  
  return (
    <View>
     + <Stack.Screen options={{title:`详情${id}`}}></Stack.Screen>
      <Text>FilmDetailScreen{id}</Text>
    </View>
  )
}

export default FilmDetailScreen
```

## 5、选择等级

```tsx
  const rates = ['G' , 'Q' , 'B']

  const [selectedRate,setSelectedRate] = useState('G')
```

渲染

```tsx
<Text>Select Rate</Text>
<View style={styles.rates}>
{rates.map(rate=>
(
  <Pressable
    onPress={()=>{setSelectedRate(rate)}}
    key={rate}
    style={[styles.rate,{backgroundColor:selectedRate === rate ? 'gainsboro' : 'white'}]}>
      <Text style={[styles.rateText,{color:selectedRate == rate ? 'black' : 'grey'}]}>{rate}</Text>
  </Pressable>
)
)}
</View>

// 样式
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
  }
```

选中后使用不同的样式

> 样式叠加使用`[styles.rate,{backgroundColor:selectedRate === rate ? 'gainsboro' : 'white'}]`

## 6、按钮编写

这里使用`Pressable`+`Text`的方式

```tsx
<Pressable
 onPress={()=>{moveToView()}} style={styles.moveToView}>
<Text style={styles.moveToViewBtn}>去观看</Text>
</Pressable>

// 样式
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
```

> 使用`marginTop`将按钮置于屏幕底部