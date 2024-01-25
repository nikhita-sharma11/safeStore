import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {selectProduct} from '../redux/reducer/actions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const numColumns = 2;

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleCardPress = item => {
    dispatch(selectProduct(item));
    navigation.navigate('ProductDetails');
  };

  return (
    <ImageBackground
      source={require('../assets/blue.png')}
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/5690080.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Product Details</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            numColumns={numColumns}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.productItem}
                onPress={() => handleCardPress(item)}>
                <Image source={{uri: item.image}} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  backIcon: {
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginLeft: 80,
    marginTop: -36,
  },
  productItem: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#ffff',
    padding: 10,
    marginTop: 4,
    marginBottom: 10,
    borderRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 5,
    textAlign: 'center',
  },

  flatlistContent: {
    paddingVertical: 8,
  },
});

export default HomeScreen;
