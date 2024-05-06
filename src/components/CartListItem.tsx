import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { CartItem } from '../types';
import { Link } from 'expo-router';
import { defaultFilmImage } from '../constants/Images';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '../providers/CartProveider';

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateTimes } = useCart();
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: cartItem.film.img || defaultFilmImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.film.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${cartItem.film.price.toFixed(2)}</Text>
          <Text>评级: {cartItem.rate}</Text>
        </View>
      </View>
      <View style={styles.timesSelector}>
        <FontAwesome
          onPress={() => updateTimes(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={{ padding: 5 }}
        />

        <Text style={styles.times}>{cartItem.times}</Text>
        <FontAwesome
          onPress={() => updateTimes(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={{ padding: 5 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: 'center',
    marginRight: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  timesSelector: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  times: {
    fontWeight: '500',
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});

export default CartListItem;