import { View, Text,LogBox } from 'react-native';
import React,{useEffect} from 'react';
import Button from '../components/Button';
import { Link } from 'expo-router';
const index = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href='/(user)' asChild>
        <Button text="用户" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="管理员" />
      </Link>
      <Link href={'/(auth)'} asChild>
        <Button text="登录" />
      </Link>
    </View>
  );
};

export default index;