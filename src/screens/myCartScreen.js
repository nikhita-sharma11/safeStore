import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  removeFromCart,
  updateCartItemQuantity,
} from '../redux/reducer/cartAction';

const MyCartScreen = ({navigation}) => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const [itemQuantities, setItemQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach(item => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setItemQuantities(initialQuantities);
  }, [cartItems]);

  const handleIncrementQuantity = productId => {
    dispatch(updateCartItemQuantity(productId, itemQuantities[productId] + 1));
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = productId => {
    const newQuantity = (itemQuantities[productId] || 0) - 1;

    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity(productId, newQuantity));
      setItemQuantities(prevQuantities => ({
        ...prevQuantities,
        [productId]: newQuantity,
      }));
    } else {
      dispatch(removeFromCart(productId));
      setItemQuantities(prevQuantities => {
        const newQuantities = {...prevQuantities};
        delete newQuantities[productId];
        return newQuantities;
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/5690080.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const renderItem = ({item}) => {
    const quantity = item.quantity || 1;
    const totalPrice = quantity * item.price;

    return (
      <View style={styles.cartItem}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={{color: '#2196F3', fontSize: 15, fontWeight: 'bold'}}>
            {item.title}
          </Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleIncrementQuantity(item.id)}>
              <Text style={{fontWeight: 'bold'}}>+</Text>
            </TouchableOpacity>
            <Text>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleRemoveFromCart(item.id)}>
              <Text style={{fontWeight: 'bold'}}>-</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              backgroundColor: '#2196F3',
              width: 'auto',
              textAlign: 'center',
              borderRadius: 4,
              color: 'white',
            }}>
            Price : ${totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const quantity = itemQuantities[item.id] || 1;
      return total + quantity * item.price;
    }, 0);
  };
  const handleCheckout = () => {
    alert('Checkout button pressed!');
  };
  return (
    <ImageBackground
      source={require('../assets/backg.png')}
      style={styles.background}>
      <View style={styles.container}>
        {cartItems.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item =>
              item && item.id ? item.id.toString() : Math.random().toString()
            }
          />
        )}

        {cartItems.length > 0 && (
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>
              Checkout - ${getTotalPrice().toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'fill',
  },
  container: {
    flex: 1,
    padding: 25,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    marginRight: 40,
  },
  productDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 8,
  },
  checkoutButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MyCartScreen;
