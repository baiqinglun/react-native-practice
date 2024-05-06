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

## 7、全局属性useContext

使用`useContext`定义全局属性，用于跨组件访问

基本框架定义

1. 创建`CartContext`并设置初始值
2. 创建提供者填写`value`值并返回组件`<CartContext.Provider value={{items,addItem}}>{children}</CartContext.Provider>`
3. 导出`useContext(CartContext)`方便跨组件使用，这样不需要再别的组件使用`useContext(CartContext)`获取

```tsx
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem ,Film} from '@/types'
import * as Crypto from 'expo-crypto';

type CartType = {
    items:CartItem[],
    addItem:(film:Film,rate:CartItem['rate']) => void,
  }
// 1. 创建`CartContext`并设置初始值
const CartContext = createContext<CartType>({
    items:[],
    addItem:()=>{},
})

// 2. 
const CartProvider = ({children}:PropsWithChildren) => {
    const [items,setItems] = useState<CartItem[]>([])
    
    // 新增观看影片
    const addItem = (film:Film,rate:CartItem['rate']) => {
        const newCartItem:CartItem = {
            id:Crypto.randomUUID(),
            film,
            film_id:film.id,
            rate,
            times:1
        }
        setItems([newCartItem,...items])
    }

    return (
        <CartContext.Provider value={{items,addItem}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

export const useCart = () => useContext(CartContext)
```

提供给其他组件使用
```tsx
// app/_layoout.tsx
function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      +<CartProvider>
      {/* 内部的即为children */}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
        </Stack>
      +</CartProvider>
    </ThemeProvider>
  );
}
```

使用
```tsx
import { useCart } from '@/providers/CartProveider';

const {addItem} = useCart()

  const moveToView = () => {
    if(!film){
      return;
    }

    addItem(film,selectedRate)
    router.push('/cart')
  }
```

## 8、更新数量

1. 这里的`map`需要有返回值，而`filter`不需要返回值
2. 循环`items`，如果`item.id!== itemId`直接返回原本的`item`，等于则修改。
3. 重新赋值`updatedItems`

```tsx
// 更新数量
const updateTimes = (itemId:string,amount:-1 | 1) => {
    // console.log(itemId,amount)
    const updatedItems = items.map((item)=>{
        return item.id !== itemId ? item : {...item,times:item.times+amount}
    }).filter((item)=>item.times>0)
    setItems(updatedItems)
}
```

## 9、新增观看影片

在新增之前进行判断，如果`film`信息和`rate`一致则不进行添加，而是修改后直接返回。

> 一开始想着添加后进行查找修改，太麻烦了。

```tsx
// 新增观看影片
const addItem = (film:Film,rate:CartItem['rate']) => {
    const existCartItem = items.find((item)=>item.film === film && item.rate === rate)

    if(existCartItem){
        updateTimes(existCartItem.id,1)
        return;
    }

    const newCartItem:CartItem = {
        id:Crypto.randomUUID(),
        film,
        film_id:film.id,
        rate,
        times:1
    }
    setItems([newCartItem,...items])
    // console.log(items)
}
```

## 10、累加

累加函数`reduce`，需要返回值
> 这里的初始值为0

```tsx
const totalPrice = items.reduce((sum,item) => (sum += item.film.price * item.times),0);
```

## 11、代码文件结构

1. `_layout.tsx`：总框架
2. `index.tsx`：默认首页
3. `[id].tsx`：传递`id`

## 12、页面跳转

```tsx
import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const TabIndex = () => {
  return (
    <Redirect href={'/(admin)/film'}></Redirect>
  )
}

export default TabIndex
```

## 13、获取管线列表

当前页面处于的管线位置

```tsx
const segments = useSegments()

> ["(user)", "film"]
```

## 14、Stack右上角图标

统一配置

```tsx
<Stack screenOptions={{
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <AntDesign
                  name="clockcircle"
                  size={25}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}>
        <Stack.Screen
          name='index'
          options={{title:"电影栏"}}></Stack.Screen>
    </Stack>
```

单独配置
```tsx
// 单独配置页面右上角图标
<Stack>
    {/*电影栏页面  */}
    <Stack.Screen
      name='index'
      options={{
        headerRight: () => (
          <Link href="/cart" asChild>
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
          </Link>),
        title:"电影栏"
      }}></Stack.Screen>

    {/* 每个电影的内容页面 */}
    <Stack.Screen
      name='[id]'
      options={{
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="pencil"
                  size={25}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  color={Colors.light.tint}
                />
              )}
            </Pressable>
          </Link>
        )}}></Stack.Screen>
</Stack>
```

## 15、图片选择

![网址](https://docs.expo.dev/versions/latest/sdk/imagepicker/)

```tsx
const [image, setImage] = useState(null);

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

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
```

## 16、二元和三元表达式

二元表达式
```tsx
{image && <Image source={{ uri: image }} style={styles.image} />}
```

三元表达式
```tsx
<Stack.Screen options={{title:isUpdating?"编辑":"创建",headerTitleAlign:'center'}}></Stack.Screen>
```

## 17、转换为bool进行判断

使用双`!`，第一个`!`表示转化为boll并取反，第二个`!`表示取反，两个`!!`叠加表示转换为bool

```tsx
const isUpdating = !!id
```